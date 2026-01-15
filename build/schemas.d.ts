import { z } from 'zod';
export declare const TelemetrySchema: z.ZodObject<{
    temperature: z.ZodNumber;
    humidity: z.ZodNumber;
    battery: z.ZodOptional<z.ZodNumber>;
    payload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>;
export type TelemetryInput = z.infer<typeof TelemetrySchema>;
//# sourceMappingURL=schemas.d.ts.map