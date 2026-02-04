import { Router } from 'express';
import { getSessionToken } from '../controllers/sessionController';

const router = Router();

router.get('/session', getSessionToken);

export default router;
