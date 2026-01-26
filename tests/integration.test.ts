import request from 'supertest';
import app from '../src/app';

describe('IoT Platform Full Handshake', () => {
  

  let userToken: string;
  let userId: number;

  let adminToken: string;
  let adminId: number;

  let createdDeviceId: string;
  let createdDeviceToken: string;
  

  // --- 1. AUTH & ROLE TESTING ---
  describe('Authentication & Roles', () => {

    //Sucessful Registration of a User USER
    it('should register a generic USER', async () => {
      const res = await request(app).post('/auth/register').send({
        email: 'user@test.com',
        password: 'password123',
        role: 'USER'
      });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
    });

    //Sucessful Registration of a User ADMIN
    it('should register an ADMIN', async () => {
      const res = await request(app).post('/auth/register').send({
        email: 'admin@test.com',
        password: 'adminpass',
        role: 'ADMIN'
      });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
    });

    //Fail Registration of a User USER - missing email
    it('should fail to register an User without email', async () => {
      const res = await request(app).post('/auth/register').send({
        password: 'password123',
      });
      expect(res.status).toBe(400);
    });
   
    //Fail Registration of a User USER - missing password
    it('should fail to register an User without password', async () => {
      const res = await request(app).post('/auth/register').send({
        email: 'user@test.com',
      });
      expect(res.status).toBe(400);
    });

    //Fail Registration of a User that already registered the email
    it('should fail to register a User with email already registered', async () => {
      const res = await request(app).post('/auth/register').send({
        email: 'user@test.com',
        password: 'querty123',
      });
      expect(res.status).toBe(409);
    });
    
    
    //Successful login of a USER
    it('should login USER and get JWT', async () => {
      const res = await request(app).post('/auth/login').send({
        email: 'user@test.com',
        password: 'password123'
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      userToken = res.body.token; // Save for future requests
      userId = res.body.user.id; // Save for future requests
    });

    it('should get the user profile', async () => {
      const res = await request(app)
        .get(`/api/profile/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(userId);
      expect(res.body.email).toBeDefined();
      
      // Security Check: Ensure password is NOT returned
      expect(res.body.password).toBeUndefined();
    });

    //Successful login of an ADMIN
    it('should login ADMIN and get JWT', async () => {
      const res = await request(app).post('/auth/login').send({
        email: 'admin@test.com',
        password: 'adminpass'
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      adminToken = res.body.token; // Save for future requests
    });
  });

  // --- 2. DEVICE LIFECYCLE (USER) ---
  describe('Device Management (User Flow)', () => {
    
    it('should login USER and get JWT', async () => {
      const res = await request(app).post('/auth/login').send({
        email: 'user10@example.com',
        password: 'password123'
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      userToken = res.body.token; // Save for future requests
      userId = res.body.user.id; // Save for future requests
    });

    it('should create a new device', async () => {
      const res = await request(app)
        .post(`/api/devices/${userId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          serial: 'SN-000000-11',
          name: 'Test Sensor 11',
          location: 'my-home'
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      createdDeviceId = res.body.id;
      createdDeviceToken = res.body.registrationToken;
    });

    it('should retrieve the device token separately', async () => {
      const res = await request(app)
        .get(`/api/devices/${userId}/${createdDeviceId}/deviceToken`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
      expect(typeof res.body.token).toBe('string');
    });

    it('should update the device name', async () => {
      const res = await request(app)
        .patch(`/api/devices/${userId}/${createdDeviceId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Test Sensor 02',
        });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Test Sensor 02');
    });

    it('should update the device location', async () => {
      const res = await request(app)
        .patch(`/api/devices/${userId}/${createdDeviceId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          location: 'my-car'
        });

      expect(res.status).toBe(200);
      expect(res.body.location).toBe('my-car');
    });

    it('should list devices', async () => {
      const res = await request(app)
        .get(`/api/devices/${userId}`)
        .set('Authorization', `Bearer ${userToken}`)
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0); //TO BE FIXED 
      expect(res.body[0].ownerId).toBe(userId);
    });

    it('should list a single device', async () => {
      const res = await request(app)
        .get(`/api/devices/${userId}/${createdDeviceId}`)
        .set('Authorization', `Bearer ${userToken}`)
      
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(createdDeviceId);
      expect(res.body.ownerId).toBe(userId);
    });

    it('should delete a device', async () => {
      const res = await request(app)
        .delete(`/api/devices/${userId}/${createdDeviceId}`)
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Device deleted successfully.');
      expect(res.body.deleted).toBeDefined();
      expect(res.body.deleted.id).toBe(createdDeviceId);
    });

    it('should return 404 when trying to get the deleted device', async () => {
      // 3. Verify it's actually gone
      const res = await request(app)
        .get(`/api/devices/${userId}/${createdDeviceId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(404);
    });
    
  });

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
//   });

});