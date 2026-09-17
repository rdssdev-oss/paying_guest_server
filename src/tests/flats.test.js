import request from 'supertest';
import app from '../app.js';

describe('Flats Routes', () => {
  it('should reject unauthenticated access to list flats', async () => {
    const res = await request(app).get('/api/v1/flats');
    expect(res.status).toBe(401);
  });

  it('should reject unauthenticated access to create a flat', async () => {
    const res = await request(app).post('/api/v1/flats').send({});
    expect(res.status).toBe(401);
  });

  it('should reject requests with a malformed auth token', async () => {
    const res = await request(app)
      .get('/api/v1/flats')
      .set('Authorization', 'Bearer not-a-real-token');
    expect(res.status).toBe(401);
  });
});
