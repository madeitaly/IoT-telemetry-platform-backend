import jwt from 'jsonwebtoken';
// Get the secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_VERY_STRONG_SECRET';
/**
 * Middleware to verify a JWT and attach the userId to the request.
 */
export const authenticateToken = (req, res, next) => {
    // 1. Get the Authorization header
    const authHeader = req.headers['authorization'];
    // Format: 'Bearer <TOKEN>'
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ error: 'Access Denied. No token provided.' });
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
//# sourceMappingURL=auth.middleware.js.map