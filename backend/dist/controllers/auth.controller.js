"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_dto_1 = require("../dtos/auth.dto");
class AuthController {
    // Handle HTTP POST /api/auth/login
    async login(req, res, next) {
        try {
            const validatedData = auth_dto_1.LoginDto.parse(req.body);
            const result = await auth_service_1.authService.login(validatedData);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
            }
            res.status(401).json({ success: false, message: error.message || 'Authentication failed' });
        }
    }
    // Handle HTTP POST /api/auth/register
    async register(req, res, next) {
        try {
            const validatedData = auth_dto_1.RegisterUserDto.parse(req.body);
            const result = await auth_service_1.authService.register(validatedData);
            res.status(201).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
            }
            res.status(400).json({ success: false, message: error.message || 'Registration failed' });
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
