import request from 'supertest';
import app from '../src/app';

describe('IoT Platform Full Handshake', () => {
  

  let userToken: string;
  let userId: number;
  let testUserId: number;

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
      testUserId = res.body.user.id; // Save for future deletion
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

    it('should logout the user', async () => {
      const res = await request(app)
        .post('/auth/logout')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Logged out successfully');
    });

    it('should fail to get the user profile', async () => {
      const res = await request(app)
        .get(`/api/profile/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Session expired (Logged out)');
    });
  });

  // --- 2. DEVICE LIFECYCLE (USER) PART 1---
  describe('Device Management Creation (User Flow)', () => {
    
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
  });

  // --- 3. TELEMETRY & ZOD VALIDATION ---
  describe('Telemetry Ingestion', () => {
    it('should ACCEPT valid telemetry data', async () => {
      const res = await request(app)
        .post('/api/telemetry')
        .set('x-device-token', createdDeviceToken)
        .send({
          deviceId: createdDeviceId,
          temperature: 25.5,
          humidity: 55,
          battery: 20,
          payload: { status: "ok", firmware: "1.0.0"},
          ts: new Date().toISOString()
        });

      expect(res.status).toBe(202); // Or 200
    });

    it('should REJECT invalid data format (Zod Validation)', async () => {
      const res = await request(app)
        .post('/api/telemetry')
        .set('x-device-token', createdDeviceToken)
        .send({
          deviceId: createdDeviceId,
          temperature: 255,
        });

      // Expecting 400 Bad Request from Zod middleware
      expect(res.status).toBe(400); 
    });
  });

  // --- 4. QUERY DATA ---
  describe('Data Retrieval', () => {
    it('should allow User to fetch telemetry for their device', async () => {
      const res = await request(app)
        .get(`/api/telemetry/${createdDeviceId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);

      expect(res.body.length).toBeGreaterThan(0);

      res.body.forEach((item: any) => {
        expect(item).toHaveProperty('temperature');
        expect(item).toHaveProperty('ts');
        expect(item).toHaveProperty('payload');
      });
    });
  });

  // --- 5. DEVICE LIFECYCLE (USER) PART 2---
  describe('Device Management Deletion (User Flow)', () => {
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

  // --- 6. ADMIN MANAGEMENT ---
  describe('Admin Management', () => {
    //Successful login of an ADMIN
    it('should login ADMIN and get JWT', async () => {
      const res = await request(app).post('/auth/login').send({
        email: 'admin@test.com',
        password: 'adminpass'
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      adminToken = res.body.token; // Save for future requests
      adminId = res.body.user.id; // Save for future deletion
    });

    //Successful deletion of a User
    it('should delete a User ', async () => {
      const res = await request(app)
        .delete(`/api/admin/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`);
  
        expect(res.status).toBe(200);
        expect(res.body.deleted).toBe('user@test.com');
    });

    //Successful deletion of an Admin
    it('should delete an Admin ', async () => {
      const res = await request(app)
        .delete(`/api/admin/users/${adminId}`)
        .set('Authorization', `Bearer ${adminToken}`);
  
        expect(res.status).toBe(200);
        expect(res.body.deleted).toBe('admin@test.com');
    });
  });


  

  

});