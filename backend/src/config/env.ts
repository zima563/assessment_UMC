import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'secret',
    name: process.env.DB_NAME || 'employee_management',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'super_secret_jwt_key_employee_management_2026',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
};
