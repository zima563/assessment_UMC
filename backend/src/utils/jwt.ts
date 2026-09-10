import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config/env';
import { UserRole } from '../entities/User';

export interface JwtPayload {
  userId: string;
  username: string;
  role: UserRole;
}

// Generate JWT signed token with user payload
export function generateToken(payload: JwtPayload): string {
  const options: SignOptions = {
    expiresIn: config.jwt.expiresIn as SignOptions['expiresIn'],
  };
  return jwt.sign(payload, config.jwt.secret, options);
}

// Verify JWT token signature and return decoded payload
export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, config.jwt.secret) as JwtPayload;
}

