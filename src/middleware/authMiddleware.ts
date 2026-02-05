import { Request, Response, NextFunction } from 'express';
import db from '../../models';

export interface AuthRequest extends Request {
  sessionId?: number;
  token?: string;
}

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization as string;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing token' });
    }

    const token = authHeader.substring(7);
    const { Session } = db;
    const session = await Session.findOne({ where: { token } });

    if (!session) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.sessionId = session.id;
    req.token = token;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};