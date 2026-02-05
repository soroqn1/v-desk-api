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
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

startServer();
