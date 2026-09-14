"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const User_1 = require("../entities/User");
const router = (0, express_1.Router)();
// Protect all employee routes with JWT Authentication
router.use(auth_middleware_1.authenticate);
// Read routes (Accessible by Admin and User)
router.get('/', (req, res) => employee_controller_1.employeeController.getAll(req, res));
router.get('/:id', (req, res) => employee_controller_1.employeeController.getById(req, res));
// Write routes (Restricted to Admin role only)
router.post('/', (0, auth_middleware_1.authorize)(User_1.UserRole.ADMIN), (req, res) => employee_controller_1.employeeController.create(req, res));
router.put('/:id', (0, auth_middleware_1.authorize)(User_1.UserRole.ADMIN), (req, res) => employee_controller_1.employeeController.update(req, res));
router.delete('/:id', (0, auth_middleware_1.authorize)(User_1.UserRole.ADMIN), (req, res) => employee_controller_1.employeeController.delete(req, res));
exports.default = router;
