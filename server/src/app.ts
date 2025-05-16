import express from 'express';
import userRouter from './routes/user';
import taskRouter from './routes/task';
import swaggerSetup from './swagger';

const app = express();
app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

// Swagger UI at /api-docs
swaggerSetup(app);

export default app;
