import type { Request, Response } from 'express';
interface AuthRequest extends Request {
    userId?: number;
}
export declare function createDevice(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getDevices(req: AuthRequest, res: Response): Promise<void>;
export declare function getDevice(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateDevice(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteDevice(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=device.controller.d.ts.map