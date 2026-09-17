import request from 'supertest';
import app from '../app.js';

describe('Platform (Super Admin) Routes', () => {
  it('should reject unauthenticated access to list organizations', async () => {
    const res = await request(app).get('/api/v1/platform/organizations');
    expect(res.status).toBe(401);
  });

  it('should reject a non-super-admin role from listing organizations', async () => {
    const jwt = await import('jsonwebtoken');
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
    const token = jwt.default.sign({ id: '1', role: 'ADMIN', organizationId: '2' }, process.env.JWT_SECRET);

    const res = await request(app)
      .get('/api/v1/platform/organizations')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });
});
