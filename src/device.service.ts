import {prisma} from './prisma-client.js'; 
import type { Device } from './generated/prisma/client.js';

// --- Type Definitions for clear function signatures ---
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


////////////////////////////
// --- CRUD Operations ---//
////////////////////////////


/** POST /api/devices: Creates a new device owned by a user. */
export async function createDevice(data: DeviceCreateInput): Promise<Device> {
    return prisma.device.create({
        data,
    });
}

/** GET /api/devices: Finds all devices owned by a specific user. */
export async function getDevicesByOwner(ownerId: number): Promise<Device[]> {
    return prisma.device.findMany({
        where: { ownerId },
        orderBy: { name: 'asc' },
    });
}

/** GET /api/devices/:id: Finds a single device by ID and ownerId. */
export async function getDeviceById(id: number, ownerId: number): Promise<Device | null> {
    return prisma.device.findUnique({
        where: { 
            id: id,
            ownerId: ownerId, // Security: Ensure the device belongs to the requesting user
        },
    });
}

/** PATCH /api/devices/:id: Updates device details. */
export async function updateDevice(
    id: number,
    ownerId: number,
    data: DeviceUpdateInput
): Promise<Device> {
    return prisma.device.update({
        where: {
            id: id,
            ownerId: ownerId, // Security check
        },
        data,
    });
}

/** DELETE /api/devices/:id: Deletes a device. */
export async function deleteDevice(id: number, ownerId: number): Promise<Device> {
    return prisma.device.delete({
        where: {
            id: id,
            ownerId: ownerId, // Security check
        },
    });
}