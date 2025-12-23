import {prisma} from './prisma-client.js';
import redis from './redis.service.js';
// import { createClient } from 'redis';

// const redis = createClient();
// redis.connect().catch(console.error);

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
    const redisKey = `device:latest:${deviceId}`;
    await redis.set(redisKey, JSON.stringify({
        temperature: data.temperature,
        humidity: data.humidity,
        ts: new Date()
    }), {
        EX: 3600 
    });
    
    // 2. Save to PostgreSQL for historical logs (Prisma)
    // We use a transaction to ensure both the telemetry log 
    // and the device status are updated together.
    return prisma.$transaction(async (tx) => {
        // 1. Create the telemetry record
        const telemetry = await tx.telemetry.create({
            data: {
                deviceId,
                payload: data.payload || {},
                temperature: data.temperature,
                humidity: data.humidity,
                battery: data.battery,
            }
        });

        // 2. Update the Device lastSeen
        const device = await tx.device.update({
            where: { id: deviceId },
            data: { lastSeen: new Date() }
        });

        return { telemetry, device };
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