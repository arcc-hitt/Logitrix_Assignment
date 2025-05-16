import { Router } from 'express';
import Task from '../models/Task';
import User from '../models/User';

const router = Router();

// Create task
router.post('/', async (req, res): Promise<void> => {
  const { title, userId } = req.body;
  if (!await User.exists({ _id: userId })) {
    res.status(400).json({ error: 'Invalid userId' });
    return;
  }
  try {
    const t = await Task.create({ title, userId });
    res.status(201).json(t);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// Get tasks for user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  const tasks = await Task.find({ userId });
  res.json(tasks);
});

// Update status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  const update: any = { status };
  if (status === 'done') update.completedAt = new Date(); // timestamp done tasks :contentReference[oaicite:11]{index=11}
  const t = await Task.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(t);
});

// Delete task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
