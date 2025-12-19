/*
    Business logic (hashing, JWT creation, DB interaction)
*/
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma-client.js';
// --- Configuration ---
// Get the secret key from environment variables (MANDATORY for production)
const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_VERY_STRONG_SECRET';
const SALT_ROUNDS = 10; // Standard industry practice for bcrypt
/**
 * Hashes a plaintext password using bcrypt.
 * @param password The plaintext password.
 * @returns The hashed password string.
 */
export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(password, salt);
}
/**
 * Compares a plaintext password with a hashed password.
 * @param password The plaintext password.
 * @param hash The stored hash.
 * @returns A boolean indicating if the passwords match.
 */
export function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}
/**
 * Creates a JSON Web Token (JWT) for a user.
 * @param userId The ID of the user.
 * @returns The signed JWT string.
 */
export function createToken(userId) {
    const payload = { userId };
    // Token expires in 1 day
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}
/////////////////////////////////
// --- Database Operations --- //
/////////////////////////////////
/**
 * Finds a user by their email address.
 */
export async function findUserByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
}
/**
 * Finds a user by their ID.
 */
export async function findUserById(id) {
    return prisma.user.findUnique({ where: { id } });
}
/**
 * Creates a new user in the database.
 */
export async function createUser(email, passwordHash) {
    return prisma.user.create({
        data: {
            email: email.toLowerCase(),
            password: passwordHash,
        },
    });
}
//# sourceMappingURL=auth.service.js.map