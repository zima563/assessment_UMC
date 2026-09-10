import { z } from 'zod';
import { UserRole } from '../entities/User';

// Login DTO Schema
export const LoginDto = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(4, 'Password must be at least 4 characters long'),
});

export type LoginDtoType = z.infer<typeof LoginDto>;

// Register User DTO Schema
export const RegisterUserDto = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(4, 'Password must be at least 4 characters long'),
  role: z.nativeEnum(UserRole).optional().default(UserRole.USER),
});

export type RegisterUserDtoType = z.infer<typeof RegisterUserDto>;
