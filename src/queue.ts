import { config } from './config.js';
import { Queue, Worker } from 'bullmq';
import {prisma} from './prisma-client.js';

const connection = { url: config.redisUrl };

// 1. Define the Queue
export const telemetryQueue = new Queue('telemetry-ingestion', { connection });

// 2. Define the Worker (The "Background Processor")
const worker = new Worker('telemetry-ingestion', async (job) => {
    const { deviceId, data } = job.data;

    try {
        // Heavy DB Work happens here, away from the user's request
        await prisma.$transaction([
            prisma.telemetry.create({
                data: {
                    deviceId,
                    temperature: data.temperature,
                    humidity: data.humidity,
                    payload: data.payload || {},
                    battery: data.battery
                }
            }),
            prisma.device.update({
                where: { id: deviceId },
                data: { lastSeen: new Date() }
            })
        ]);
    } catch (error) {
        console.error(`Failed to process job ${job.id}:`, error);
        throw error; // BullMQ will automatically retry failed jobs
    }
}, { connection });

worker.on('completed', (job) => console.log(`Job ${job.id} synced to DB`));
