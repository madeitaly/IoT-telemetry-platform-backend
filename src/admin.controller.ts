import {prisma} from './prisma-client.js';

export async function deleteUser(req: any, res: any) {
    const targetUserId = parseInt(req.params.id);
    // Prisma will automatically delete associated devices if you set up 
    // "onDelete: Cascade" in the schema, otherwise delete them first.
    await prisma.user.delete({ where: { id: targetUserId } });
    res.json({ message: 'User and their data deleted successfully' });
}


export async function adminDeleteDevice(req: any, res: any) {
    const deviceId = parseInt(req.params.id);
    await prisma.device.delete({ where: { id: deviceId } });
    res.json({ message: 'Device deleted by admin' });
}