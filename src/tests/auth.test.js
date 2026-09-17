import request from 'supertest';
import app from '../app.js';

describe('Auth Routes', () => {
  it('should fail to register with invalid input', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({});
    expect(res.status).toBe(400);
  });

  it('should fail to login with invalid input', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({});
    expect(res.status).toBe(400);
  });
});
