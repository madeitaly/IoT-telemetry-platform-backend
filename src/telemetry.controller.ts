import type { Request, Response } from 'express';
import * as telemetryService from './telemetry.service.js';

// Extend the Request interface to ensure userId is available after JWT middleware
interface AuthRequest extends Request {
    userId?: number;
}

export async function ingestTelemetry(req: Request, res: Response) {
    const token = req.headers['x-device-token'] as string;
    
    if (!token) return res.status(401).json({ error: 'Device token missing' });

    const deviceId = await telemetryService.validateDeviceToken(token);
    if (!deviceId) return res.status(403).json({ error: 'Invalid or expired token' });

    try {
        const entry = await telemetryService.saveTelemetry(deviceId, req.body);

        res.status(202).json({ status: 'success' });
    } catch (err) {
        res.status(500).json({ error: 'Ingestion failed' });
    }
}


// export async function fetchTelemetry(req: Request, res: Response) {
//     const deviceId = parseInt(req.params.deviceId as string);
//     const { start, end } = req.query;

//     if (isNaN(deviceId)) return res.status(400).json({ error: 'Invalid ID' });

//     try {
//         const data = await telemetryService.getTelemetry(
//             deviceId, 
//             new Date(start as string || '2000-01-01'), 
//             new Date(end as string || new Date())
//         );
//         res.json(data);
//     } catch (err) {
//         res.status(500).json({ error: 'Query failed' });
//     }
// }

export async function fetchTelemetry(req: AuthRequest, res: Response) {
    const targetUserId = parseInt(req.params.userId as string, 10);
    const targetDeviceId = parseInt(req.params.deviceId as string, 10);
    const requesterId = req.userId;
    const { start, end } = req.query;
    
    if (isNaN(targetDeviceId)) return res.status(400).json({ error: 'Invalid ID' });


    // 1. Security Check (Horizontal Privilege Escalation prevention)
    if (targetUserId !== requesterId) {
        return res.status(403).json({ error: 'Forbidden: You can only get Telemetry data of your own devices' });
    }

    try {
        const data = await telemetryService.getTelemetryForUser(
            targetDeviceId,
            requesterId,
            new Date(start as string || '2000-01-01'),
            new Date(end as string || new Date())
        );

        res.json(data);
    } catch (err: any) {
        if (err.message === 'FORBIDDEN') {
            return res.status(403).json({ error: 'Forbidden: You can only get Telemetry data of your own devices' });
        }
        res.status(500).json({ error: 'Query failed' });
    }
    

    

    // try {
    //     const data = await telemetryService.getTelemetry(
    //         targetDeviceId, 
    //         new Date(start as string || '2000-01-01'), 
    //         new Date(end as string || new Date())
    //     );
    //     res.json(data);
    // } catch (err) {
    //     res.status(500).json({ error: 'Query failed' });
    // }
}