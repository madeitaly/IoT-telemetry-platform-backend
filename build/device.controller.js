import * as deviceService from './device.service.js';
// Helper to handle 404 (Not Found) responses
const handleNotFound = (res) => {
    return res.status(404).json({ error: 'Device not found or not owned by user.' });
};
// --- POST /api/devices ---
export async function createDevice(req, res) {
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
    }
    catch (error) {
        console.error('Create device error:', error);
        // Handle unique constraint violation (if serial already exists)
        if (error === 'P2002') {
            return res.status(409).json({ error: 'Device with this serial number already exists.' });
        }
        res.status(500).json({ error: 'Internal server error.' });
    }
}
// --- GET /api/devices ---
export async function getDevices(req, res) {
    const ownerId = req.userId; // Guaranteed by JWT middleware
    try {
        const devices = await deviceService.getDevicesByOwner(ownerId);
        res.status(200).json(devices);
    }
    catch (error) {
        console.error('Get devices error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}
// --- GET /api/devices/:id ---
export async function getDevice(req, res) {
    const id = parseInt(req.params.id, 10);
    const ownerId = req.userId;
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid device ID format.' });
    }
    try {
        const device = await deviceService.getDeviceById(id, ownerId);
        if (!device) {
            return handleNotFound(res);
        }
        res.status(200).json(device);
    }
    catch (error) {
        console.error('Get device error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}
// --- PATCH /api/devices/:id ---
export async function updateDevice(req, res) {
    const id = parseInt(req.params.id, 10);
    const ownerId = req.userId;
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
    }
    catch (error) {
        // Prisma error P2025: Record not found (or not matching where clause)
        if (error === 'P2025') {
            return handleNotFound(res);
        }
        console.error('Update device error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}
// --- DELETE /api/devices/:id ---
export async function deleteDevice(req, res) {
    const id = parseInt(req.params.id, 10);
    const ownerId = req.userId;
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid device ID format.' });
    }
    try {
        const deletedDevice = await deviceService.deleteDevice(id, ownerId);
        // Respond with 204 No Content for a successful deletion, 
        // or return the deleted object for confirmation (as done here).
        res.status(200).json({ message: 'Device deleted successfully.', deleted: deletedDevice });
    }
    catch (error) {
        // Prisma error P2025: Record not found
        if (error === 'P2025') {
            return handleNotFound(res);
        }
        console.error('Delete device error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}
//# sourceMappingURL=device.controller.js.map