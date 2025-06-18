const request = require('supertest');
const app = require('../app');

describe('Closing Duties API', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'user@example.com',
      password: 'string'
    });
    token = res.body.token;
  });

  it('should create a closing duty', async () => {
    const res = await request(app)
      .post('/api/v1/closing-duties')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Lock cash drawer' });
    expect(res.statusCode).toBe(201);
  });

  it('should submit a closing duty as employee', async () => {
    const empRes = await request(app).post('/api/v1/auth/login').send({
      email: 'employee@example.com',
      password: 'string'
    });
    const empToken = empRes.body.token;

    const res = await request(app)
      .post('/api/v1/closing-duties/submit')
      .set('Authorization', `Bearer ${empToken}`)
      .send({
        submissions: [{ closing_duty_id: 1, completed: true }]
      });
    expect(res.statusCode).toBe(201);
  });
});
