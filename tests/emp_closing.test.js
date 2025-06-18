// tests/closingDuties.test.js
const request = require('supertest');
const app = require('../app');
let token;

beforeAll(async () => {
  const res = await request(app).post('/api/v1/auth/login').send({
    email: 'employee@example.com',
    password: 'yourPassword'
  });
  token = res.body.token;
});

describe('Closing Duty Submissions', () => {
  test('Employee submits closing duties', async () => {
    const res = await request(app)
      .post('/api/v1/closing-duties')
      .set('Authorization', `Bearer ${token}`)
      .send({
        location_id: 1,
        date: '2025-06-12',
        completed_duties: { duty1: true, duty2: false },
        signature: 'John Doe'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
