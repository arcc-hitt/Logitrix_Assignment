import cron from 'node-cron';
import Task from './models/Task';

export default function startCronJob() {
  // every minute check for in-progress older than 2h
  cron.schedule('* * * * *', async () => {
    const cutoff = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const res = await Task.updateMany(
      { status: 'in-progress', updatedAt: { $lt: cutoff } },
      { status: 'done', completedAt: new Date() }
    );
    console.log(`Auto‑closed ${res.modifiedCount} tasks`);
  });
}
