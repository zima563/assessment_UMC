"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentController = exports.DepartmentController = void 0;
const department_service_1 = require("../services/department.service");
const department_dto_1 = require("../dtos/department.dto");
class DepartmentController {
    // Handle HTTP GET /api/departments
    async getAll(req, res) {
        try {
            const query = department_dto_1.QueryDepartmentDto.parse(req.query);
            const result = await department_service_1.departmentService.getAll(query);
            res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Invalid query parameters', errors: error.errors });
            }
            res.status(500).json({ success: false, message: error.message || 'Failed to fetch departments' });
        }
    }
    // Handle HTTP GET /api/departments/:id
    async getById(req, res) {
        try {
            const department = await department_service_1.departmentService.getById(req.params.id);
            res.status(200).json({ success: true, data: department });
        }
        catch (error) {
            res.status(404).json({ success: false, message: error.message || 'Department not found' });
        }
    }
    // Handle HTTP POST /api/departments
    async create(req, res) {
        try {
            const validatedData = department_dto_1.CreateDepartmentDto.parse(req.body);
            const department = await department_service_1.departmentService.create(validatedData);
            res.status(201).json({ success: true, data: department });
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
            }
            res.status(400).json({ success: false, message: error.message || 'Failed to create department' });
        }
    }
    // Handle HTTP PUT /api/departments/:id
    async update(req, res) {
        try {
            const validatedData = department_dto_1.UpdateDepartmentDto.parse(req.body);
            const department = await department_service_1.departmentService.update(req.params.id, validatedData);
            res.status(200).json({ success: true, data: department });
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
            }
            res.status(400).json({ success: false, message: error.message || 'Failed to update department' });
        }
    }
    // Handle HTTP DELETE /api/departments/:id
    async delete(req, res) {
        try {
            await department_service_1.departmentService.delete(req.params.id);
            res.status(200).json({ success: true, message: 'Department deleted successfully' });
        }
        catch (error) {
            res.status(404).json({ success: false, message: error.message || 'Failed to delete department' });
        }
    }
}
exports.DepartmentController = DepartmentController;
exports.departmentController = new DepartmentController();
