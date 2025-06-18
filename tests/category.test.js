const request = require('supertest');
const app = require('../app');
let token;

beforeAll(async () => {
  const res = await request(app).post('/api/v1/auth/login').send({
    email: 'user@example.com',
    password: 'string'
  });
  token = res.body.token;
});

describe('Category API', () => {
  it('should create a new category', async () => {
    const res = await request(app)
      .post('/api/v1/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Beverages' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all categories', async () => {
    const res = await request(app)
      .get('/api/v1/categories')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
