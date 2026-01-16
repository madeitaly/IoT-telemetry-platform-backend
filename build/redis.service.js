import { config } from './config.js';
import { createClient } from 'redis';
if (!config.redisUrl) {
    if (config.isProduction) {
        throw new Error('REDIS_URL environment variable is not set in production. This is required for Redis connection.');
    }
    else {
        // This case should not be reachable given the default in config.ts, but acts as a safeguard.
        throw new Error('redisUrl is not configured. This should not happen in development.');
    }
}
console.log(config.redisUrl);
const redis = createClient({ url: config.redisUrl });
redis.on('error', (err) => console.error('Redis Client Error', err));
await redis.connect();
/**
 * Fetches the latest state for an array of device IDs
 */
export async function getLatestStates(deviceIds) {
    if (deviceIds.length === 0)
        return [];
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
/**
 * Adds a token to the blacklist until it naturally expires.
 * @param token The JWT string
 * @param expiresInSeconds Duration in seconds until the token expires
 */
export async function blacklistToken(token, expiresInSeconds) {
    const key = `blacklist:${token}`;
    // We set the value to '1', but the important part is the Expiration (EX)
    await redis.set(key, '1', { EX: expiresInSeconds });
}
/**
 * Checks if a token is in the blacklist.
 */
export async function isTokenBlacklisted(token) {
    const key = `blacklist:${token}`;
    const result = await redis.get(key);
    return result !== null;
}
export default redis;
//# sourceMappingURL=redis.service.js.map