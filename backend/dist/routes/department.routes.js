"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const department_controller_1 = require("../controllers/department.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const User_1 = require("../entities/User");
const router = (0, express_1.Router)();
// Protect all department routes with JWT Authentication
router.use(auth_middleware_1.authenticate);
// Read routes (Accessible by both Admin and User)
router.get('/', (req, res) => department_controller_1.departmentController.getAll(req, res));
router.get('/:id', (req, res) => department_controller_1.departmentController.getById(req, res));
// Write routes (Restricted to Admin role only)
router.post('/', (0, auth_middleware_1.authorize)(User_1.UserRole.ADMIN), (req, res) => department_controller_1.departmentController.create(req, res));
router.put('/:id', (0, auth_middleware_1.authorize)(User_1.UserRole.ADMIN), (req, res) => department_controller_1.departmentController.update(req, res));
router.delete('/:id', (0, auth_middleware_1.authorize)(User_1.UserRole.ADMIN), (req, res) => department_controller_1.departmentController.delete(req, res));
exports.default = router;
