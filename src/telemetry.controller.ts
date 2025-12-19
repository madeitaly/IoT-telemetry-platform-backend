import type { Request, Response } from 'express';
import * as telemetryService from './telemetry.service.js';


export async function ingestTelemetry(req: Request, res: Response) {
    const token = req.headers['x-device-token'] as string;
    
    if (!token) return res.status(401).json({ error: 'Device token missing' });

    const deviceId = await telemetryService.validateDeviceToken(token);
    if (!deviceId) return res.status(403).json({ error: 'Invalid or expired token' });

    try {
        const { telemetry, device } = await telemetryService.saveTelemetry(deviceId, req.body);
        const entry = await telemetryService.saveTelemetry(deviceId, req.body);

        res.status(201).json({ status: 'success' });
    } catch (err) {
        res.status(500).json({ error: 'Ingestion failed' });
    }
}


export async function fetchTelemetry(req: Request, res: Response) {
    const deviceId = parseInt(req.params.deviceId);
    const { start, end } = req.query;

    if (isNaN(deviceId)) return res.status(400).json({ error: 'Invalid ID' });

    try {
        const data = await telemetryService.getTelemetry(
            deviceId, 
            new Date(start as string || '2000-01-01'), 
            new Date(end as string || new Date())
        );
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Query failed' });
    }
}