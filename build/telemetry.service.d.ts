/**
 * Validates a device token and returns the associated deviceId.
 */
export declare function validateDeviceToken(token: string): Promise<number | null>;
/**
 * Saves telemetry data to the DB.
 */
export declare function saveTelemetry(deviceId: number, data: any): Promise<{
    telemetry: {
        id: number;
        deviceId: number;
        ts: Date;
        payload: import("@prisma/client/runtime/client.js").JsonValue;
        temperature: number | null;
        humidity: number | null;
        battery: number | null;
    };
    device: {
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        serial: string;
        location: string | null;
        ownerId: number;
        lastSeen: Date | null;
    };
}>;
/**
 * Retrieves telemetry for a specific device within a timeframe.
 */
export declare function getTelemetry(deviceId: number, start: Date, end: Date): Promise<{
    id: number;
    deviceId: number;
    ts: Date;
    payload: import("@prisma/client/runtime/client.js").JsonValue;
    temperature: number | null;
    humidity: number | null;
    battery: number | null;
}[]>;
//# sourceMappingURL=telemetry.service.d.ts.map