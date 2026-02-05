import { Request, Response } from 'express';
import db from '../models/index';

const { Task, Option } = db;

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: Option,
          attributes: ['id', 'text'],
          as: 'options',
        },
      ],
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};