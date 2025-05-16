import { Router } from 'express';
import User from '../models/User';

const router = Router();

/**
 * @openapi
 * /users:
 *   post:
 *     description: Register a new user
 *     requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/User' }}}}
 *     responses: { '201': { description: 'Created' }, '400': { description: 'Bad Request' } }
 */
router.post('/', async (req, res) => {
  try {
    const u = await User.create(req.body);
    res.status(201).json(u);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
