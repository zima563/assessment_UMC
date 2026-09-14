"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeController = exports.EmployeeController = void 0;
const employee_service_1 = require("../services/employee.service");
const employee_dto_1 = require("../dtos/employee.dto");
class EmployeeController {
    // Handle HTTP GET /api/employees
    async getAll(req, res) {
        try {
            const query = employee_dto_1.QueryEmployeeDto.parse(req.query);
            const result = await employee_service_1.employeeService.getAll(query);
            res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Invalid query parameters', errors: error.errors });
            }
            res.status(500).json({ success: false, message: error.message || 'Failed to fetch employees' });
        }
    }
    // Handle HTTP GET /api/employees/:id
    async getById(req, res) {
        try {
            const employee = await employee_service_1.employeeService.getById(req.params.id);
            res.status(200).json({ success: true, data: employee });
        }
        catch (error) {
            res.status(404).json({ success: false, message: error.message || 'Employee not found' });
        }
    }
    // Handle HTTP POST /api/employees
    async create(req, res) {
        try {
            const validatedData = employee_dto_1.CreateEmployeeDto.parse(req.body);
            const employee = await employee_service_1.employeeService.create(validatedData);
            res.status(201).json({ success: true, data: employee });
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
            }
            res.status(400).json({ success: false, message: error.message || 'Failed to create employee' });
        }
    }
    // Handle HTTP PUT /api/employees/:id
    async update(req, res) {
        try {
            const validatedData = employee_dto_1.UpdateEmployeeDto.parse(req.body);
            const employee = await employee_service_1.employeeService.update(req.params.id, validatedData);
            res.status(200).json({ success: true, data: employee });
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
            }
            res.status(400).json({ success: false, message: error.message || 'Failed to update employee' });
        }
    }
    // Handle HTTP DELETE /api/employees/:id
    async delete(req, res) {
        try {
            await employee_service_1.employeeService.delete(req.params.id);
            res.status(200).json({ success: true, message: 'Employee deleted successfully' });
        }
        catch (error) {
            res.status(404).json({ success: false, message: error.message || 'Failed to delete employee' });
        }
    }
}
exports.EmployeeController = EmployeeController;
exports.employeeController = new EmployeeController();
