import request from 'supertest';
import app from '../src/app';
import { clearDatabase } from './prisma-setup';

describe('IoT Platform Full Handshake', () => {
  
  // Clear DB before starting
  beforeAll(async () => {
    await clearDatabase();
  });

  let userToken: string;
  let adminToken: string;
  let createdDeviceId: string;

  // --- 1. AUTH & ROLE TESTING ---
  describe('Authentication & Roles', () => {
    it('should register a generic USER', async () => {
      const res = await request(app).post('/auth/register').send({
        email: 'user@test.com',
        password: 'password123',
        role: 'USER' // Assuming your register handles role or defaults to USER
      });
      expect(res.status).toBe(201); // or 200 depending on your controller
      expect(res.body).toHaveProperty('token');
    });

  //   it('should register an ADMIN', async () => {
  //     const res = await request(app).post('/auth/register').send({
  //       email: 'admin@test.com',
  //       password: 'adminpass',
  //       role: 'ADMIN'
  //     });
  //     expect(res.status).toBe(201);
  //     expect(res.body).toHaveProperty('token');
  //   });

  //   it('should login USER and get JWT', async () => {
  //     const res = await request(app).post('/auth/login').send({
  //       email: 'user@test.com',
  //       password: 'password123'
  //     });
  //     expect(res.status).toBe(200);
  //     expect(res.body).toHaveProperty('token');
  //     userToken = res.body.token; // Save for future requests
  //   });

  //   it('should login ADMIN and get JWT', async () => {
  //     const res = await request(app).post('/auth/login').send({
  //       email: 'admin@test.com',
  //       password: 'adminpass'
  //     });
  //     expect(res.status).toBe(200);
  //     expect(res.body).toHaveProperty('token');
  //     adminToken = res.body.token;
  //   });
  // });

  // // --- 2. DEVICE LIFECYCLE (USER) ---
  // describe('Device Management (User Flow)', () => {
  //   it('should create a new device', async () => {
  //     const res = await request(app)
  //       .post('/api/devices')
  //       .set('Authorization', `Bearer ${userToken}`)
  //       .send({
  //         name: 'Test Sensor 01',
  //         type: 'temperature-sensor'
  //       });

  //     expect(res.status).toBe(201);
  //     expect(res.body).toHaveProperty('id');
  //     createdDeviceId = res.body.id;
  //   });

  //   it('should list devices', async () => {
  //     const res = await request(app)
  //       .get('/api/devices')
  //       .set('Authorization', `Bearer ${userToken}`);
      
  //     expect(res.status).toBe(200);
  //     expect(Array.isArray(res.body)).toBe(true);
  //     expect(res.body.length).toBeGreaterThan(0);
  //   });
  // });

  // // --- 3. TELEMETRY & ZOD VALIDATION ---
  // describe('Telemetry Ingestion', () => {
  //   it('should REJECT invalid data format (Zod Validation)', async () => {
  //     const res = await request(app)
  //       .post('/api/telemetry')
  //       .send({
  //         deviceId: createdDeviceId,
  //         // Missing 'value' or 'timestamp' assuming your schema requires them
  //         nonsenseField: 'invalid'
  //       });

  //     // Expecting 400 Bad Request from Zod middleware
  //     expect(res.status).toBe(400); 
  //   });

  //   it('should ACCEPT valid telemetry data', async () => {
  //     const res = await request(app)
  //       .post('/api/telemetry')
  //       .send({
  //         deviceId: createdDeviceId,
  //         data: { temp: 25.5 }, // Adjust based on your actual TelemetrySchema
  //         timestamp: new Date().toISOString()
  //       });

  //     expect(res.status).toBe(201); // Or 200
  //   });
  // });

  // // --- 4. QUERY DATA ---
  // describe('Data Retrieval', () => {
  //   it('should allow User to fetch telemetry for their device', async () => {
  //     const res = await request(app)
  //       .get(`/api/telemetry/${createdDeviceId}`)
  //       .set('Authorization', `Bearer ${userToken}`);

  //     expect(res.status).toBe(200);
  //     expect(res.body).toHaveProperty('data'); // Assuming response structure
  //   });
  // });

  // // --- 5. ADMIN RESTRICTIONS ---
  // describe('Admin Access Control', () => {
  //   it('should PREVENT User from deleting devices via Admin API', async () => {
  //     const res = await request(app)
  //       .delete(`/api/admin/devices/${createdDeviceId}`)
  //       .set('Authorization', `Bearer ${userToken}`);

  //     expect(res.status).toBe(403); // Forbidden
  //   });

  //   it('should ALLOW Admin to delete devices', async () => {
  //     const res = await request(app)
  //       .delete(`/api/admin/devices/${createdDeviceId}`)
  //       .set('Authorization', `Bearer ${adminToken}`);

  //     // Expect success (200) or 204 No Content
  //     expect([200, 204]).toContain(res.status);
  //   });
  });

});