const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

let token;
let businessId;

beforeAll(async () => {
  await sequelize.sync();

 
  // Login and get token
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'user@example.com',
      password: 'string'
    });

  token = res.body.token;
});

describe('Business API', () => {
  test('Create business', async () => {
    const res = await request(app)
      .post('/api/v1/businesses')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Teleco', address: '123 Main St', logo: 'https://example.com/logo.png', brand_color: '#fff' });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Teleco');
    businessId = res.body.id;
  });

  test('Get all businesses', async () => {
    const res = await request(app)
      .get('/api/v1/businesses')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Update business', async () => {
    const res = await request(app)
      .put(`/api/v1/businesses/${businessId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Teleco Updated' });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Teleco Updated');
  });

  test('Delete business', async () => {
    const res = await request(app)
      .delete(`/api/v1/businesses/${businessId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Business deleted successfully');
  });
});
