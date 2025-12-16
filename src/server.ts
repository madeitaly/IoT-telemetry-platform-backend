import * as dotenv from 'dotenv'; // For loading environment variables
import morgan from "morgan";
import express from "express";
//import type { Request, Response } from "express"
import { register, login, getProfile } from './auth.controller';
import { authenticateToken } from './auth.middleware';

// Load environment variables from .env file
dotenv.config();

//Environmental Variables
const LOCAL_PORT = process.env.PORT || 3000;

const app = express()

// MIDDLEWARE //
app.use(morgan("dev"));

// Middleware to parse JSON bodies
app.use(express.json());


/////////////////////////////////////
//  ROUTING OF THE HTTPS REQUESTS ///
/////////////////////////////////////

// --- Public Routes ---
app.post('/auth/register', register);
app.post('/auth/login', login);

// --- Protected Route ---
// The authenticateToken middleware runs first, verifying the JWT
app.get('/auth/profile', authenticateToken, getProfile);

app.listen(LOCAL_PORT, () => {
    console.log(`Server is running on http://localhost:${LOCAL_PORT}`);
    console.log(`JWT_SECRET is set: ${!!process.env.JWT_SECRET}`);
});