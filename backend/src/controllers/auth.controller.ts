import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { LoginDto, RegisterUserDto } from '../dtos/auth.dto';

export class AuthController {
  // Handle HTTP POST /api/auth/login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = LoginDto.parse(req.body);
      const result = await authService.login(validatedData);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
      }
      res.status(401).json({ success: false, message: error.message || 'Authentication failed' });
    }
  }

  // Handle HTTP POST /api/auth/register
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = RegisterUserDto.parse(req.body);
      const result = await authService.register(validatedData);
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
      }
      res.status(400).json({ success: false, message: error.message || 'Registration failed' });
    }
  }
}

export const authController = new AuthController();
