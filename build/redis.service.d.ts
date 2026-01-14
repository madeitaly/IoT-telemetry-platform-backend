import type { RedisClientType } from 'redis';
declare let redis: RedisClientType;
/**
 * Fetches the latest state for an array of device IDs
 */
export declare function getLatestStates(deviceIds: number[]): Promise<{
    deviceId: number;
    state: any;
}[]>;
export default redis;
//# sourceMappingURL=redis.service.d.ts.map