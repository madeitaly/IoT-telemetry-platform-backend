import jwt from 'jsonwebtoken';
import { prisma } from './prisma-client.js';
import { isTokenBlacklisted } from './redis.service.js'; // Import this
// Get the secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_VERY_STRONG_SECRET';
/**
 * Middleware to verify a JWT and attach the userId to the request.
 */
export const authenticateToken = async (req, res, next) => {
    // 1. Get the Authorization header
    const authHeader = req.headers['authorization'];
    // Format: 'Bearer <TOKEN>'
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ error: 'Access Denied. No token provided.' });
    }
    // 2. Check Blacklist BEFORE verifying (or after, both work)
    const isBlacklisted = await isTokenBlacklisted(token);
    if (isBlacklisted) {
        return res.status(401).json({ error: 'Session expired (Logged out)' });
    }
    // 2. Verify the token
    try {
        // 'as { userId: number }' casts the decoded payload to the expected shape
        const decoded = jwt.verify(token, JWT_SECRET);
        // 3. Attach the userId to the request object
        req.userId = decoded.userId;
        next(); // Proceed to the next middleware/controller
    }
    catch (err) {
        // Token is invalid (e.g., expired, incorrect signature)
        console.error('JWT verification failed:', err);
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
};
/**
 * Middleware to restrict access to specific roles.
 * Usage: authorizeRoles('ADMIN')
 */
export const authorizeRoles = (...allowedRoles) => {
    return async (req, res, next) => {
        const userId = req.userId;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        // Fetch user from DB to check current role
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        });
        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).json({
                error: `Access Denied. Required role: ${allowedRoles.join(' or ')}`
            });
        }
        next(); // User has the required role
    };
};
//# sourceMappingURL=auth.middleware.js.map