const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const { sequelize } = require('../models');
const User = require('../models/User');

beforeAll(async () => {
  await sequelize.sync(); // Reset DB before test
});


describe('Auth API', () => {
  const testUser = {
    "name": "string",
  "email": "user@example.com",
  "password": "string",
  "role": "owner",
  "phone": "00000000",
  "business_id": 0,
  "temp_password": "string",
  "is_temp_password": true
  };

  test('Register user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe(testUser.email);
    expect(res.body.user).toHaveProperty('name');
    expect(res.body.user).toHaveProperty('role');
    expect(res.body.user).toHaveProperty('business_id');
    expect(res.body.user).toHaveProperty('temp_password');
    expect(res.body.user).toHaveProperty('phone');
    expect(res.body.user).toHaveProperty('is_temp_password');
  });

  test('Login user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe(testUser.email);
    expect(res.body.user).toHaveProperty('name');
    expect(res.body.user).toHaveProperty('role');
    expect(res.body.user).toHaveProperty('business_id');
    expect(res.body.user).toHaveProperty('temp_password');
    expect(res.body.user).toHaveProperty('phone');
    expect(res.body.user).toHaveProperty('is_temp_password');
  });

  test('Reject invalid login', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: testUser.email, password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
    
  });
});
