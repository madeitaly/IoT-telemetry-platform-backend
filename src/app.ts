import morgan from "morgan";
import express from "express";
import { register, login, logout, getProfile } from './auth.controller.js';
import { 
    createDevice, 
    getDevices, 
    getDevice, 
    updateDevice, 
    deleteDevice,
    getFleetStatus 
} from './device.controller.js';
import { ingestTelemetry, fetchTelemetry } from './telemetry.controller.js';
import { authenticateToken } from './auth.middleware.js';
import { authorizeRoles } from './auth.middleware.js';
import * as adminCtrl from './admin.controller.js';
import { validate } from './validate.middleware.js';
import { TelemetrySchema } from './schemas.js'
import cors from 'cors';
import { config } from './config.js';


const app = express()

// MIDDLEWARE //
app.use(morgan("dev"));

// Middleware to parse JSON bodies
app.use(express.json());

if (config.isDevelopment) {
    app.use(cors()); // Allow all origins for development
}



/////////////////////////////////////
//  ROUTING OF THE HTTPS REQUESTS ///
/////////////////////////////////////

// --- Public Routes ---
app.post('/auth/register', register);
app.post('/auth/login', login);

// --- Device Ingestion (Uses Device Token) ---
app.post('/api/telemetry', validate(TelemetrySchema), ingestTelemetry);

// --- Protected Route ---
// All subsequent routes require a valid JWT
app.use('/api', authenticateToken); // <-- Apply middleware to ALL /api routes

// --- Protected Authentication Routes ---
app.get('/api/profile/:userId', getProfile);

// --- USER & ADMIN ROUTES ---
app.get('/api/devices/status-summary', authenticateToken, getFleetStatus);

// --- ADMIN ONLY ROUTES ---
// We chain the authorizeRoles middleware
app.delete('/api/admin/users/:id', authorizeRoles('ADMIN'), adminCtrl.deleteUser);
app.delete('/api/admin/devices/:id', authorizeRoles('ADMIN'), adminCtrl.adminDeleteDevice);

// --- Protected Device Routes ---
app.post('/auth/logout', authenticateToken, logout);
app.post('/api/devices', createDevice);
app.get('/api/devices/:userId', getDevices);
app.get('/api/devices/:userId/:deviceId', getDevice);
app.patch('/api/devices/:id', updateDevice);
app.delete('/api/devices/:id', deleteDevice);
// Fetching telemetry history (User looking at device data)
app.get('/api/telemetry/:deviceId', fetchTelemetry);


export default app; // Export app