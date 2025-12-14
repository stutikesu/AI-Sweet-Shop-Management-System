import request from 'supertest';
import app from '../src/index';

describe('POST /api/auth/register', () => {
  it('should register a new user and return 201 status code with a valid JWT token', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      role: 'CUSTOMER',
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('token');
    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe('string');
    expect(response.body.token.length).toBeGreaterThan(0);
  });
});

