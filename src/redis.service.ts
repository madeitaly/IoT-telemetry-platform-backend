import { createClient } from 'redis';
import {config} from './config.js';

const redis = createClient({ url: config.redisUrl });
redis.on('error', (err) => console.error('Redis Client Error', err));
await redis.connect();

/**
 * Fetches the latest state for an array of device IDs
 */
export async function getLatestStates(deviceIds: number[]) {
    if (deviceIds.length === 0) return [];

    // Keys look like: ["device:latest:1", "device:latest:2", ...]
    const keys = deviceIds.map(id => `device:latest:${id}`);
    
    // MGET returns an array of values in the same order as the keys
    const results = await redis.mGet(keys);

    return results.map((data, index) => {
        return {
            deviceId: deviceIds[index],
            state: data ? JSON.parse(data) : null // null if the key expired or doesn't exist
        };
    });
}

export default redis;