import { Request, Response } from 'express';
import { employeeService } from '../services/employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto, QueryEmployeeDto } from '../dtos/employee.dto';

export class EmployeeController {
  // Handle HTTP GET /api/employees
  async getAll(req: Request, res: Response) {
    try {
      const query = QueryEmployeeDto.parse(req.query);
      const result = await employeeService.getAll(query);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ success: false, message: 'Invalid query parameters', errors: error.errors });
      }
      res.status(500).json({ success: false, message: error.message || 'Failed to fetch employees' });
    }
  }

  // Handle HTTP GET /api/employees/:id
  async getById(req: Request, res: Response) {
    try {
      const employee = await employeeService.getById(req.params.id);
      res.status(200).json({ success: true, data: employee });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message || 'Employee not found' });
    }
  }

  // Handle HTTP POST /api/employees
  async create(req: Request, res: Response) {
    try {
      const validatedData = CreateEmployeeDto.parse(req.body);
      const employee = await employeeService.create(validatedData);
      res.status(201).json({ success: true, data: employee });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
      }
      res.status(400).json({ success: false, message: error.message || 'Failed to create employee' });
    }
  }

  // Handle HTTP PUT /api/employees/:id
  async update(req: Request, res: Response) {
    try {
      const validatedData = UpdateEmployeeDto.parse(req.body);
      const employee = await employeeService.update(req.params.id, validatedData);
      res.status(200).json({ success: true, data: employee });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
      }
      res.status(400).json({ success: false, message: error.message || 'Failed to update employee' });
    }
  }

  // Handle HTTP DELETE /api/employees/:id
  async delete(req: Request, res: Response) {
    try {
      await employeeService.delete(req.params.id);
      res.status(200).json({ success: true, message: 'Employee deleted successfully' });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message || 'Failed to delete employee' });
    }
  }
}

export const employeeController = new EmployeeController();
