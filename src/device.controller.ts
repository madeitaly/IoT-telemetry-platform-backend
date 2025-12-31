import type { Request, Response } from 'express';
import * as redisService from './redis.service.js';
import * as deviceService from './device.service.js';
import {prisma} from './prisma-client.js';

// Extend the Request interface to ensure userId is available after JWT middleware
interface AuthRequest extends Request {
    userId?: number;
}

// Helper to handle 404 (Not Found) responses
const handleNotFound = (res: Response) => {
    return res.status(404).json({ error: 'Device not found or not owned by user.' });
};

// --- POST /api/devices ---
export async function createDevice(req: AuthRequest, res: Response) {
    const { serial, name, location } = req.body;
    const ownerId = req.userId; // Guaranteed by JWT middleware

    if (!ownerId || !serial || !name) {
        return res.status(400).json({ error: 'Missing required fields (serial, name).' });
    }

    try {
        const newDevice = await deviceService.createDevice({
            serial,
            name,
            location,
            ownerId,
        });
        res.status(201).json(newDevice);
    } catch (error) {
        console.error('Create device error:', error);
        // Handle unique constraint violation (if serial already exists)
        if (error === 'P2002') {
             return res.status(409).json({ error: 'Device with this serial number already exists.' });
        }
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// --- GET /api/devices ---
export async function getDevices(req: AuthRequest, res: Response) {
    const ownerId = req.userId!; // Guaranteed by JWT middleware

    try {
        const devices = await deviceService.getDevicesByOwner(ownerId);
        res.status(200).json(devices);
    } catch (error) {
        console.error('Get devices error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// --- GET /api/devices/:id ---
export async function getDevice(req: AuthRequest, res: Response) {
    const id = parseInt(req.params.id, 10);
    const ownerId = req.userId!;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid device ID format.' });
    }

    try {
        const device = await deviceService.getDeviceById(id, ownerId);
        if (!device) {
            return handleNotFound(res);
        }
        res.status(200).json(device);
    } catch (error) {
        console.error('Get device error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// --- PATCH /api/devices/:id ---
export async function updateDevice(req: AuthRequest, res: Response) {
    const id = parseInt(req.params.id, 10);
    const ownerId = req.userId!;
    const { name, location } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid device ID format.' });
    }

    if (!name && !location) {
        return res.status(400).json({ error: 'Must provide fields to update (name or location).' });
    }
    
    // Only include fields that were actually sent in the request body
    const updateData = { name, location };

    try {
        const updatedDevice = await deviceService.updateDevice(id, ownerId, updateData);
        res.status(200).json(updatedDevice);
    } catch (error) {
        // Prisma error P2025: Record not found (or not matching where clause)
        if (error === 'P2025') {
            return handleNotFound(res);
        }
        console.error('Update device error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// --- DELETE /api/devices/:id ---
export async function deleteDevice(req: AuthRequest, res: Response) {
    const id = parseInt(req.params.id, 10);
    const ownerId = req.userId!;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid device ID format.' });
    }

    try {
        const deletedDevice = await deviceService.deleteDevice(id, ownerId);
        // Respond with 204 No Content for a successful deletion, 
        // or return the deleted object for confirmation (as done here).
        res.status(200).json({ message: 'Device deleted successfully.', deleted: deletedDevice });
    } catch (error) {
        // Prisma error P2025: Record not found
        if (error === 'P2025') {
            return handleNotFound(res);
        }
        console.error('Delete device error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

/**
 * GET /api/devices/status-summary
 * Returns all user devices paired with their latest real-time telemetry from Redis.
 */
export async function getFleetStatus(req: any, res: any) {
    const userId = req.userId;

    try {
        // 1. Fetch user to check role
        const requester = await prisma.user.findUnique({ where: { id: userId } });

        // 2. Determine Query: Admin gets everything, User gets personal list
        const queryFilter = requester?.role === 'ADMIN' ? {} : { ownerId: userId };

        const devices = await prisma.device.findMany({
            where: queryFilter,
            select: { id: true, name: true, serial: true, location: true, lastSeen: true, ownerId: true }
        });

        const deviceIds = devices.map(d => d.id);

        // 2. Fetch the "Hot Data" from Redis
        //const liveStates = await getLatestStates(deviceIds);
        const liveStates = await redisService.getLatestStates(deviceIds);

        // 3. Merge DB info (names, serials) with Redis info (temp, battery)
        const summary = devices.map(device => {
            const liveData = liveStates.find(s => s.deviceId === device.id);
            return {
                ...device,
                status: liveData?.state ? 'online' : 'offline',
                telemetry: liveData?.state || null
            };
        });

        res.json(summary);

        // 1. Get the list of devices from the DB (Source of Truth for ownership)
        //const devices = await deviceService.getDevicesByOwner(ownerId);
        //const deviceIds = devices.map(d => d.id);

        // 2. Fetch the "Hot Data" from Redis
        //const liveStates = await redisService.getLatestStates(deviceIds);

        // 3. Merge DB info (names, serials) with Redis info (temp, battery)
        // const summary = devices.map(device => {
        //     const liveData = liveStates.find(s => s.deviceId === device.id);
        //     return {
        //         id: device.id,
        //         name: device.name,
        //         serial: device.serial,
        //         location: device.location,
        //         lastSeen: device.lastSeen,
        //         status: liveData?.state ? 'online' : 'offline',
        //         telemetry: liveData?.state || null
        //     };
        // });

    } catch (error) {
        console.error('Fleet status error:', error);
        res.status(500).json({ error: 'Failed to aggregate fleet status' });
    }
}