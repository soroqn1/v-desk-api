import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import db from './models/index';
import sessionRoutes from './routes/sessionRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api', sessionRoutes);
app.use('/api', taskRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'App is running' });
});

const startServer = async () => {
  try {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });

    await db.sequelize.authenticate();
    console.log('Database connected successfully.');
    await db.sequelize.sync({ alter: true });
    console.log('Database tables synced.');

    const taskCount = await db.Task.count();
    if (taskCount === 0) {
      console.log('Seeding initial data...');

      const task1 = await db.Task.create({ instruction: 'What is the capital of France?' });
      await db.Option.bulkCreate([
        { taskId: task1.id, text: 'London', isCorrect: false },
        { taskId: task1.id, text: 'Paris', isCorrect: true },
        { taskId: task1.id, text: 'Berlin', isCorrect: false },
        { taskId: task1.id, text: 'Madrid', isCorrect: false }
      ]);
      const task2 = await db.Task.create({ instruction: 'What is 2 + 2?' });
      await db.Option.bulkCreate([
        { taskId: task2.id, text: '3', isCorrect: false },
        { taskId: task2.id, text: '4', isCorrect: true },
        { taskId: task2.id, text: '5', isCorrect: false },
        { taskId: task2.id, text: '22', isCorrect: false }
      ]);
      const task3 = await db.Task.create({ instruction: 'Which planet is closest to the Sun?' });
      await db.Option.bulkCreate([
        { taskId: task3.id, text: 'Venus', isCorrect: false },
        { taskId: task3.id, text: 'Earth', isCorrect: false },
        { taskId: task3.id, text: 'Mercury', isCorrect: true },
        { taskId: task3.id, text: 'Mars', isCorrect: false }
      ]);

      console.log('Initial data seeded successfully.');
    }
  } catch (error: any) {
    console.error('CRITICAL ERROR DURING STARTUP:');
    console.error(error.message);
    console.error(error.stack);
  }
};

app.use((err: any, req: any, res: any, next: any) => {
  console.error('API ERROR:', err);
  res.status(500).json({ error: err.message });
});

startServer();
