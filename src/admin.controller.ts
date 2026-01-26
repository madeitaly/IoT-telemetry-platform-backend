import {prisma} from './prisma-client.js';
import { deleteUser} from './auth.service.js';
import { deleteDeviceWithTokens } from './device.service.js';

export async function adminDeleteUser(req: any, res: any) {
    const targetUserId = parseInt(req.params.userId);
    
    try {
        const deletedUser = await deleteUser(targetUserId);
        res.status(200).json({
            message: 'User deleted successfully by Admin',
            deleted: deletedUser.email,
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}


export async function adminDeleteDevice(req: any, res: any) {
    const targetDeviceId = parseInt(req.params.deviceId);

    try{
        const deletedDevice = await deleteDeviceWithTokens(targetDeviceId);
                
        return res.status(200).json({
            message: 'Device deleted successfully by Admin',
            deleted: deletedDevice,
        });
        
    } catch (error: any) {
        console.error('Delete device error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}