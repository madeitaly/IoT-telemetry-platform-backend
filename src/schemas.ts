import { z } from 'zod';

// 1. Telemetry Validation (Crucial for IoT)
export const TelemetrySchema = z.object({
  temperature: z.number().min(-50).max(100), // Physical limits
  humidity: z.number().min(0).max(100),
  battery: z.number().min(0).max(100).optional(),
  payload: z.record(z.string(),z.any()).optional(), // Flexible JSON
  ts: z.iso.datetime({ offset: false }) // must end with Z
});

// // 2. Device Creation Validation
// export const CreateDeviceSchema = z.object({
//   serial: z.string().min(5).max(50),
//   name: z.string().min(2).max(100),
//   location: z.string().optional(),
// });

// // 3. Auth Validation
// export const RegisterSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8),
// });

// Extract Types automatically
export type TelemetryInput = z.infer<typeof TelemetrySchema>;
//export type CreateDeviceInput = z.infer<typeof CreateDeviceSchema>;
