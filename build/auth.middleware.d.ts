import type { Request, Response, NextFunction } from 'express';
interface AuthRequest extends Request {
    userId?: number;
}
/**
 * Middleware to verify a JWT and attach the userId to the request.
 */
export declare const authenticateToken: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
/**
 * Middleware to restrict access to specific roles.
 * Usage: authorizeRoles('ADMIN')
 */
export declare const authorizeRoles: (...allowedRoles: string[]) => (req: any, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=auth.middleware.d.ts.map