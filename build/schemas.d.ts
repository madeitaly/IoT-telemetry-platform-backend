import { z } from 'zod';
export declare const TelemetrySchema: z.ZodObject<{
    temperature: z.ZodNumber;
    humidity: z.ZodNumber;
    battery: z.ZodOptional<z.ZodNumber>;
    payload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>;
export declare const CreateDeviceSchema: z.ZodObject<{
    serial: z.ZodString;
    name: z.ZodString;
    location: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const RegisterSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type TelemetryInput = z.infer<typeof TelemetrySchema>;
export type CreateDeviceInput = z.infer<typeof CreateDeviceSchema>;
//# sourceMappingURL=schemas.d.ts.map