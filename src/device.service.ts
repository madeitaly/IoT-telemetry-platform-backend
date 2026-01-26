import {prisma} from './prisma-client.js'; 
import type { Device , DeviceRegistrationToken } from './generated/prisma/client.js';
import crypto from 'crypto';

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


/** POST /api/devices/:userId Creates a new device owned by a user. */
export async function createDevice(data: DeviceCreateInput): Promise<Device> {
    // We use a transaction to ensure both records are created together
    return prisma.$transaction(async (tx) => {
        // 1. Create the Device
        const device = await tx.device.create({
            data,
        });

        // 2. Generate a secure random token
        const generatedToken = crypto.randomBytes(32).toString('hex');

        // 3. Create the Token (Setting expiration to year 9999 for "forever")
        const tokenRecord = await tx.deviceRegistrationToken.create({
            data: {
                deviceId: device.id,
                token: generatedToken,
                expiresAt: new Date('9999-12-31T23:59:59Z'),
            },
        });

        // Return both so the controller can show the token to the user once
        return { ...device, registrationToken: tokenRecord.token };
    });
}

/** GET /api/devices/:userId/:deviceId/deviceToken Finds a token beloging to a specific device. */
export async function getDeviceTokenById(deviceId: number): Promise<DeviceRegistrationToken | null> {
    return prisma.deviceRegistrationToken.findFirst({
        where: { 
            deviceId: deviceId 
        },
        // Good practice: If multiple tokens exist, get the latest one
        orderBy: {
            id: 'desc' 
        }
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

// /** DELETE /api/devices/:userID/:deviceID : Deletes a device. */
// export async function deleteDevice(id: number, ownerId: number): Promise<Device> {
//     return prisma.device.delete({
//         where: {
//             id: id,
//             ownerId: ownerId, // Security check
//         },
//     });
// }

// /** DELETE Deletes a device Token. */
// export async function deleteDeviceToken(id: number): Promise<DeviceRegistrationToken> {
//     return prisma.deviceRegistrationToken.delete({
//         where: {
//             deviceId: id
//         },
//     });
// }

/** DELETE /api/devices/:userID/:deviceID : Deletes a device. */
export async function deleteDeviceWithTokens(deviceId: number, userId: number) {
  return prisma.$transaction(async (tx) => {  
    await tx.deviceRegistrationToken.deleteMany({
      where: { deviceId },
    });

    return tx.device.delete({
      where: {
        id: deviceId,
        ownerId: userId,
      },
    });
  });
}