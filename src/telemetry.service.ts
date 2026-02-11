import {prisma} from './prisma-client.js';
import redis from './redis.service.js';
import { telemetryQueue } from './queue.js';

/**
 * Validates a device token and returns the associated deviceId.
 */
export async function validateDeviceToken(token: string): Promise<number | null> {
    const record = await prisma.deviceRegistrationToken.findUnique({
        where: { token },
        select: { deviceId: true, expiresAt: true }
    });

    if (!record || record.expiresAt < new Date()) return null;
    return record.deviceId;
}

/**
 * Saves telemetry data to the DB.
 */
export async function saveTelemetry(deviceId: number, data: any) {
    // 1. Cache the "Latest State" in Redis as a JSON string
    // This key will expire in 1 hour if no new data arrives
    console.log(JSON.stringify(data));

    const redisKey = `device:latest:${deviceId}`;
    await redis.set(redisKey, JSON.stringify({
        temperature: data.temperature,
        humidity: data.humidity,
        battery: data.battery,
        payload: data.payload,
        ts: new Date()
    }), {
        EX: 3600 
    });
    
    // 2. OFF-LOAD TO QUEUE (Instant)
    // We don't 'await' the DB write, we just 'await' putting it in the queue
    await telemetryQueue.add('sync-db', { 
        deviceId, 
        data: data 
    }, {
        removeOnComplete: true, // Keep Redis clean
        attempts: 3             // Retry if DB is down
    });
    
}

/**
 * Retrieves telemetry for a specific device within a timeframe.
 */
export async function getTelemetry(deviceId: number, start: Date, end: Date) {
    return prisma.telemetry.findMany({
        where: {
            deviceId,
            ts: { gte: start, lte: end }
        },
        orderBy: { ts: 'desc' }
    });
}

/**
 * Retrieves telemetry for a specific device belonging to a user within a timeframe.
 */
export async function getTelemetryForUser( deviceId: number, userId: number, start: Date, end: Date) {
    const device = await prisma.device.findFirst({
        where: {
            id: deviceId,
            ownerId: userId
        }
    });

    if (!device) {
        throw new Error('FORBIDDEN');
    }

    return prisma.telemetry.findMany({
        where: {
            deviceId,
            ts: { gte: start, lte: end }
        },
        orderBy: { ts: 'desc' }
    });
}