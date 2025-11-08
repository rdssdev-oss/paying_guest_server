import request from 'supertest';
import app from '../app.js';

describe('Auth Routes', () => {
  it('should fail to register with invalid input', async () => {
    const res = await request(app).post('/api/auth/register').send({});
    expect(res.status).toBe(400);
  });
});
