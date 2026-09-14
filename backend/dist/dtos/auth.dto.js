"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = exports.LoginDto = void 0;
const zod_1 = require("zod");
const User_1 = require("../entities/User");
// Login DTO Schema
exports.LoginDto = zod_1.z.object({
    username: zod_1.z.string().min(3, 'Username must be at least 3 characters long'),
    password: zod_1.z.string().min(4, 'Password must be at least 4 characters long'),
});
// Register User DTO Schema
exports.RegisterUserDto = zod_1.z.object({
    username: zod_1.z.string().min(3, 'Username must be at least 3 characters long'),
    password: zod_1.z.string().min(4, 'Password must be at least 4 characters long'),
    role: zod_1.z.nativeEnum(User_1.UserRole).optional().default(User_1.UserRole.USER),
});
