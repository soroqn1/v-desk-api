import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import db from '../models/index';

const { Session } = db;

export const getSessionToken = async (req: Request, res: Response) => {
  try {
    const token = randomUUID();
    const session = await Session.create({ token });
    res.json({ token: session.token });
  } catch (error) {
    console.error('Error generating session token:', error);
    res.status(500).json({ error: 'Failed to generate session token' });
  }
};
