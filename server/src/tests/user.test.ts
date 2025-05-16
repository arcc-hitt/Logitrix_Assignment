import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!);
});
afterAll(() => mongoose.disconnect());

describe('POST /users', () => {
  it('should create a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Jon Doe', email: 'jondoe@example.com' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });
});
