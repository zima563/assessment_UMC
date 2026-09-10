import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/swagger.config';
import authRoutes from './routes/auth.routes';
import departmentRoutes from './routes/department.routes';
import employeeRoutes from './routes/employee.routes';
import dashboardRoutes from './routes/dashboard.routes';

const app = express();

// Express security and body-parsing middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// API Documentation UI Endpoint
app.get('/api-docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    service: 'Employee Management API',
    timestamp: new Date().toISOString(),
  });
});

// Centralized error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error Middleware]:', err);
  res.status(500).json({
    message: err.message || 'Internal Server Error',
  });
});

export default app;
