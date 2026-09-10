import { Router } from 'express';
import { departmentController } from '../controllers/department.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { UserRole } from '../entities/User';

const router = Router();

// Protect all department routes with JWT Authentication
router.use(authenticate);

// Read routes (Accessible by both Admin and User)
router.get('/', (req, res) => departmentController.getAll(req, res));
router.get('/:id', (req, res) => departmentController.getById(req, res));

// Write routes (Restricted to Admin role only)
router.post('/', authorize(UserRole.ADMIN), (req, res) => departmentController.create(req, res));
router.put('/:id', authorize(UserRole.ADMIN), (req, res) => departmentController.update(req, res));
router.delete('/:id', authorize(UserRole.ADMIN), (req, res) => departmentController.delete(req, res));

export default router;
