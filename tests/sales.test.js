const request = require('supertest');
const app = require('../app');
let token;

beforeAll(async () => {
  const res = await request(app).post('/api/v1/auth/login').send({
    email: 'employee@example.com',
    password: 'password123'
  });
  token = res.body.token;
});

describe('Sales API', () => {
  it('should create a sale entry', async () => {
    const res = await request(app)
      .post('/api/v1/sales')
      .set('Authorization', `Bearer ${token}`)
      .send({
        category_id: 1,
        location_id: 1,
        date: '2025-06-12',
        amount: 123.45,
        notes: 'Gas shift total'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all sales for current user', async () => {
    const res = await request(app)
      .get('/api/v1/sales')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
