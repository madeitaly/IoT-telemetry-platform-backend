import * as dotenv from 'dotenv'; // For loading environment variables
import morgan from "morgan";
import express from "express";
//import type { Request, Response } from "express"
import { register, login, getProfile } from './auth.controller.js';
import { 
    createDevice, 
    getDevices, 
    getDevice, 
    updateDevice, 
    deleteDevice 
} from './device.controller.js';
import { authenticateToken } from './auth.middleware.js';

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
// All subsequent routes require a valid JWT
app.use('/api', authenticateToken); // <-- Apply middleware to ALL /api routes

// --- Protected Authentication Routes ---
app.get('/api/profile', getProfile);

// --- Protected Device Routes ---
app.post('/api/devices', createDevice);
app.get('/api/devices', getDevices);
app.get('/api/devices/:id', getDevice);
app.patch('/api/devices/:id', updateDevice);
app.delete('/api/devices/:id', deleteDevice);


app.listen(LOCAL_PORT, () => {
    console.log(`Server is running on http://localhost:${LOCAL_PORT}`);
    console.log(`JWT_SECRET is set: ${!!process.env.JWT_SECRET}`);
});