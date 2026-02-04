import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from '../models';
import sessionRoutes from './routes/sessionRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', sessionRoutes);
app.use('/api', taskRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'App is running' });
});

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
