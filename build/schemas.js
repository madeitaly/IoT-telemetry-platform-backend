import { z } from 'zod';
// 1. Telemetry Validation (Crucial for IoT)
export const TelemetrySchema = z.object({
    temperature: z.number().min(-50).max(100), // Physical limits
    humidity: z.number().min(0).max(100),
    battery: z.number().min(0).max(100).optional(),
    payload: z.record(z.string(), z.any()).optional(), // Flexible JSON
});
//export type CreateDeviceInput = z.infer<typeof CreateDeviceSchema>;
//# sourceMappingURL=schemas.js.map