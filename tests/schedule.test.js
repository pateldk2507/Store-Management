const request = require('supertest');
const app = require('../app'); // your Express app

let token;

beforeAll(async () => {
  const res = await request(app).post('/api/v1/auth/login').send({
    email: 'user@example.com',
    password: 'string'
  });
  token = res.body.token;
});

describe('Schedule API', () => {
  let scheduleId;

  test('Create schedule (POST /api/v1/schedules)', async () => {
    const res = await request(app)
      .post('/api/v1/schedules')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user_id: 14,
        location_id: 1,
        date: '2025-06-13',
        start_time: '09:00',
        end_time: '17:00'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    scheduleId = res.body.id;
  });

  test('Get all schedules (GET /api/v1/schedules)', async () => {
    const res = await request(app)
      .get('/api/v1/schedules')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Update schedule (PUT /api/v1/schedules/:id)', async () => {
    const res = await request(app)
      .put(`/api/v1/schedules/${scheduleId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ start_time: '10:00' });

    expect(res.statusCode).toBe(200);
    expect(res.body.start_time).toBe('10:00');
  });

  test('Delete schedule (DELETE /api/v1/schedules/:id)', async () => {
    const res = await request(app)
      .delete(`/api/v1/schedules/${scheduleId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Schedule deleted' });
  });
});
