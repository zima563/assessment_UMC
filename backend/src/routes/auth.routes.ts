import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();

// Authentication Endpoints
router.post('/login', (req, res, next) => authController.login(req, res, next));
router.post('/register', (req, res, next) => authController.register(req, res, next));

export default router;
