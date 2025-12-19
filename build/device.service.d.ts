import type { Device } from './generated/prisma/client.js';
type DeviceCreateInput = {
    serial: string;
    name: string;
    location?: string;
    ownerId: number;
};
type DeviceUpdateInput = {
    name?: string;
    location?: string;
};
/** POST /api/devices: Creates a new device owned by a user. */
export declare function createDevice(data: DeviceCreateInput): Promise<Device>;
/** GET /api/devices: Finds all devices owned by a specific user. */
export declare function getDevicesByOwner(ownerId: number): Promise<Device[]>;
/** GET /api/devices/:id: Finds a single device by ID and ownerId. */
export declare function getDeviceById(id: number, ownerId: number): Promise<Device | null>;
/** PATCH /api/devices/:id: Updates device details. */
export declare function updateDevice(id: number, ownerId: number, data: DeviceUpdateInput): Promise<Device>;
/** DELETE /api/devices/:id: Deletes a device. */
export declare function deleteDevice(id: number, ownerId: number): Promise<Device>;
export {};
//# sourceMappingURL=device.service.d.ts.map