import { Request, Response } from 'express';
import db from '../../models';
import { AuthRequest } from '../middleware/authMiddleware';

const { Answer, Option } = db;

export const submitAnswer = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.params as { taskId: string };
    const { optionId } = req.body;
    const { sessionId } = req;

    const taskIdNum = parseInt(taskId, 10);
    const optionIdNum = parseInt(optionId, 10);

    if (isNaN(taskIdNum) || isNaN(optionIdNum) || !sessionId) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const option = await Option.findByPk(optionIdNum);

    if (!option) {
      return res.status(404).json({ error: 'Option not found' });
    }

    if (option.taskId !== taskIdNum) {
      return res.status(400).json({ error: 'Option mismatch' });
    }

    const [answer] = await Answer.findOrCreate({
      where: { sessionId, taskId: taskIdNum },
      defaults: { optionId: optionIdNum },
    });

    if (answer.optionId !== optionIdNum) {
      answer.optionId = optionIdNum;
      await answer.save();
    }

    res.json({
      correct: option.isCorrect,
      selectedOptionId: optionIdNum,
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
};