import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Protect dashboard routes with JWT Authentication
router.use(authenticate);

// Analytics endpoints
router.get('/stats', (req, res) => dashboardController.getStats(req, res));

export default router;
