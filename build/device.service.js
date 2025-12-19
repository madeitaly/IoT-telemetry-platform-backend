import { prisma } from './prisma-client.js';
import crypto from 'crypto';
////////////////////////////
// --- CRUD Operations ---//
////////////////////////////
/** POST /api/devices: Creates a new device owned by a user. */
export async function createDevice(data) {
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
/** GET /api/devices: Finds all devices owned by a specific user. */
export async function getDevicesByOwner(ownerId) {
    return prisma.device.findMany({
        where: { ownerId },
        orderBy: { name: 'asc' },
    });
}
/** GET /api/devices/:id: Finds a single device by ID and ownerId. */
export async function getDeviceById(id, ownerId) {
    return prisma.device.findUnique({
        where: {
            id: id,
            ownerId: ownerId, // Security: Ensure the device belongs to the requesting user
        },
    });
}
/** PATCH /api/devices/:id: Updates device details. */
export async function updateDevice(id, ownerId, data) {
    return prisma.device.update({
        where: {
            id: id,
            ownerId: ownerId, // Security check
        },
        data,
    });
}
/** DELETE /api/devices/:id: Deletes a device. */
export async function deleteDevice(id, ownerId) {
    return prisma.device.delete({
        where: {
            id: id,
            ownerId: ownerId, // Security check
        },
    });
}
//# sourceMappingURL=device.service.js.map