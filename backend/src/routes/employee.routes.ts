import { Router } from 'express';
import { employeeController } from '../controllers/employee.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { UserRole } from '../entities/User';

const router = Router();

// Protect all employee routes with JWT Authentication
router.use(authenticate);

// Read routes (Accessible by Admin and User)
router.get('/', (req, res) => employeeController.getAll(req, res));
router.get('/:id', (req, res) => employeeController.getById(req, res));

// Write routes (Restricted to Admin role only)
router.post('/', authorize(UserRole.ADMIN), (req, res) => employeeController.create(req, res));
router.put('/:id', authorize(UserRole.ADMIN), (req, res) => employeeController.update(req, res));
router.delete('/:id', authorize(UserRole.ADMIN), (req, res) => employeeController.delete(req, res));

export default router;
