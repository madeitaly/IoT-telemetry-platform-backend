/*
    Handles incoming requests (register, login, profile)
*/
import type { Request, Response } from 'express';
import {
    hashPassword,
    comparePassword,
    createToken,
    findUserByEmail,
    findUserById,
    createUser,
} from './auth.service.js';
import * as jwt from 'jsonwebtoken';
import { blacklistToken } from './redis.service.js';

// Extend the Request interface to know about userId set by middleware
interface AuthRequest extends Request {
    userId?: number;
}

/**
 * POST /auth/register
 * Handles user registration: Hashing password and storing user in DB.
 */
export async function register(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // 1. Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists.' });
        }

        // 2. Hash the password
        const passwordHash = await hashPassword(password);

        // 3. Create the user in the database
        const newUser = await createUser(email, passwordHash);

        // 4. Create a JWT for the new user
        const token = createToken(newUser.id);

        // Respond with success and the JWT
        res.status(201).json({ 
            message: 'User registered successfully.',
            token,
            user: { id: newUser.id, email: newUser.email }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error during registration.' });
    }
}

/**
 * POST /auth/login
 * Handles user login: Compares password and issues a new JWT.
 */
export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // 1. Find the user by email
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // 2. Compare the plaintext password with the stored hash
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // 3. Create a JWT
        const token = createToken(user.id);

        // Respond with success and the JWT
        res.status(200).json({ 
            message: 'Login successful.',
            token,
            user: { id: user.id, email: user.email }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error during login.' });
    }
}

/**
 * POST /auth/logout
 * Handles user logout: get JWT and add to blacklist if not expired.
 */
export async function logout(req: Request, res: Response) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(400).json({ error: 'No token provided' });

    try {
        // Decode without verifying signature (we just need the payload 'exp')
        const decoded = jwt.decode(token) as { exp: number };

        if (!decoded || !decoded.exp) {
            return res.status(400).json({ error: 'Invalid token structure' });
        }

        // Calculate time remaining in seconds
        const nowInSeconds = Math.floor(Date.now() / 1000);
        const timeToLive = decoded.exp - nowInSeconds;

        if (timeToLive > 0) {
            // Add to Redis Blacklist
            await blacklistToken(token, timeToLive);
        }

        res.status(200).json({ message: 'Logged out successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Logout failed' });
    }
}

/**
 * GET /api/profile
 * A protected route to fetch the authenticated user's profile data.
 * Requires the `authenticateToken` middleware.
 */
export async function getProfile(req: AuthRequest, res: Response) {
    // The userId is guaranteed to be set by the authenticateToken middleware
    const requesterId = req.userId;
    const targetUserId = parseInt(req.params.userId as string, 10); 

    // 2. Security Check (Horizontal Privilege Escalation prevention)
    if (targetUserId !== requesterId) {
        // OPTIONAL: Allow if requester.role === 'ADMIN'
        return res.status(403).json({ error: 'Forbidden: You can only view your own profile' });
    }

    try {
        const user = await findUserById(targetUserId);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Return only safe data (NEVER return the password hash!)
        res.status(200).json({
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
        });

    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ error: 'Internal server error fetching profile.' });
    }
}