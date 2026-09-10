import { Request, Response } from 'express';
import { departmentService } from '../services/department.service';
import { CreateDepartmentDto, UpdateDepartmentDto, QueryDepartmentDto } from '../dtos/department.dto';

export class DepartmentController {
  // Handle HTTP GET /api/departments
  async getAll(req: Request, res: Response) {
    try {
      const query = QueryDepartmentDto.parse(req.query);
      const result = await departmentService.getAll(query);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ success: false, message: 'Invalid query parameters', errors: error.errors });
      }
      res.status(500).json({ success: false, message: error.message || 'Failed to fetch departments' });
    }
  }

  // Handle HTTP GET /api/departments/:id
  async getById(req: Request, res: Response) {
    try {
      const department = await departmentService.getById(req.params.id);
      res.status(200).json({ success: true, data: department });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message || 'Department not found' });
    }
  }

  // Handle HTTP POST /api/departments
  async create(req: Request, res: Response) {
    try {
      const validatedData = CreateDepartmentDto.parse(req.body);
      const department = await departmentService.create(validatedData);
      res.status(201).json({ success: true, data: department });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
      }
      res.status(400).json({ success: false, message: error.message || 'Failed to create department' });
    }
  }

  // Handle HTTP PUT /api/departments/:id
  async update(req: Request, res: Response) {
    try {
      const validatedData = UpdateDepartmentDto.parse(req.body);
      const department = await departmentService.update(req.params.id, validatedData);
      res.status(200).json({ success: true, data: department });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
      }
      res.status(400).json({ success: false, message: error.message || 'Failed to update department' });
    }
  }

  // Handle HTTP DELETE /api/departments/:id
  async delete(req: Request, res: Response) {
    try {
      await departmentService.delete(req.params.id);
      res.status(200).json({ success: true, message: 'Department deleted successfully' });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message || 'Failed to delete department' });
    }
  }
}

export const departmentController = new DepartmentController();
