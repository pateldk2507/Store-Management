const request = require('supertest');
const app = require('../app');
let token;

beforeAll(async () => {
  const res = await request(app).post('/api/v1/auth/login').send({
    email: 'user@example.com',
    password: 'string',
  });
  token = res.body.token;
});

describe('Employee API', () => {
  let employeeId;

  it('should create an employee', async () => {
    const res = await request(app)
      .post('/api/v1/employees')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Temp@123',
        phone: '1234567890',
        business_id: 1,
        job_title: 'Cashier'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.employee).toHaveProperty('id');
    employeeId = res.body.employee.id;
  });

  it('should fetch employees list', async () => {
    const res = await request(app)
      .get('/api/v1/employees')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should update employee', async () => {
    const res = await request(app)
      .put(`/api/v1/employees/${employeeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ job_title: 'Manager', is_manager: true });

    expect(res.statusCode).toEqual(200);
  });

  it('should delete employee', async () => {
    const res = await request(app)
      .delete(`/api/v1/employees/${employeeId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});
