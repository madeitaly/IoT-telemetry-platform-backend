import * as telemetryService from './telemetry.service.js';
export async function ingestTelemetry(req, res) {
    const token = req.headers['x-device-token'];
    if (!token)
        return res.status(401).json({ error: 'Device token missing' });
    const deviceId = await telemetryService.validateDeviceToken(token);
    if (!deviceId)
        return res.status(403).json({ error: 'Invalid or expired token' });
    try {
        const { telemetry, device } = await telemetryService.saveTelemetry(deviceId, req.body);
        const entry = await telemetryService.saveTelemetry(deviceId, req.body);
        res.status(201).json({ status: 'success' });
    }
    catch (err) {
        res.status(500).json({ error: 'Ingestion failed' });
    }
}
export async function fetchTelemetry(req, res) {
    const deviceId = parseInt(req.params.deviceId);
    const { start, end } = req.query;
    if (isNaN(deviceId))
        return res.status(400).json({ error: 'Invalid ID' });
    try {
        const data = await telemetryService.getTelemetry(deviceId, new Date(start || '2000-01-01'), new Date(end || new Date()));
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ error: 'Query failed' });
    }
}
//# sourceMappingURL=telemetry.controller.js.map