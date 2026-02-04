import { Router } from 'express';
import { getTasks } from '../controllers/taskController';
import { submitAnswer } from '../controllers/answerController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/tasks', getTasks);
router.post('/task/:taskId/answer', authMiddleware, submitAnswer);

export default router;
