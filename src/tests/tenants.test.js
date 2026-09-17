import request from 'supertest';
import app from '../app.js';

describe('Tenants Routes', () => {
  it('should reject unauthenticated access to list tenants', async () => {
    const res = await request(app).get('/api/v1/tenants');
    expect(res.status).toBe(401);
  });

  it('should reject unauthenticated access to create a tenant', async () => {
    const res = await request(app).post('/api/v1/tenants').send({});
    expect(res.status).toBe(401);
  });
});
