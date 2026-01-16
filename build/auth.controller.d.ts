import type { Request, Response } from 'express';
interface AuthRequest extends Request {
    userId?: number;
}
/**
 * POST /auth/register
 * Handles user registration: Hashing password and storing user in DB.
 */
export declare function register(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
/**
 * POST /auth/login
 * Handles user login: Compares password and issues a new JWT.
 */
export declare function login(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
/**
 * POST /auth/logout
 * Handles user logout: get JWT and add to blacklist if not expired.
 */
export declare function logout(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
/**
 * GET /api/profile
 * A protected route to fetch the authenticated user's profile data.
 * Requires the `authenticateToken` middleware.
 */
export declare function getProfile(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=auth.controller.d.ts.map