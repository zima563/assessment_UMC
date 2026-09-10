import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee Management System API',
      version: '1.0.0',
      description: 'Production REST API for Employee Management System built with Express, TypeORM, and MySQL',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token obtained from /api/auth/login',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            username: { type: 'string', example: 'admin' },
            role: { type: 'string', enum: ['Admin', 'User'], example: 'Admin' },
          },
        },
        Department: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'Engineering' },
            employeeCount: { type: 'integer', example: 5 },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Employee: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
            hireDate: { type: 'string', format: 'date', example: '2024-01-15' },
            salary: { type: 'number', example: 85000 },
            departmentId: { type: 'string', format: 'uuid', nullable: true },
            department: { $ref: '#/components/schemas/Department' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    paths: {
      '/api/auth/login': {
        post: {
          tags: ['Authentication'],
          summary: 'User Login',
          security: [],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['username', 'password'],
                  properties: {
                    username: { type: 'string', example: 'admin' },
                    password: { type: 'string', example: 'admin123' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Login successful' },
            401: { description: 'Invalid credentials' },
          },
        },
      },
      '/api/auth/register': {
        post: {
          tags: ['Authentication'],
          summary: 'User Registration',
          security: [],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['username', 'password'],
                  properties: {
                    username: { type: 'string', example: 'newuser' },
                    password: { type: 'string', example: 'password123' },
                    role: { type: 'string', enum: ['Admin', 'User'], example: 'User' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'User created successfully' },
            400: { description: 'Validation failed or username taken' },
          },
        },
      },
      '/api/auth/me': {
        get: {
          tags: ['Authentication'],
          summary: 'Get Current Authenticated User Profile',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Current user profile data' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/api/departments': {
        get: {
          tags: ['Departments'],
          summary: 'Get Paginated List of Departments',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
            { name: 'search', in: 'query', schema: { type: 'string' } },
            { name: 'sortBy', in: 'query', schema: { type: 'string', enum: ['name', 'createdAt'], default: 'createdAt' } },
            { name: 'order', in: 'query', schema: { type: 'string', enum: ['ASC', 'DESC'], default: 'DESC' } },
          ],
          responses: {
            200: { description: 'List of departments' },
          },
        },
        post: {
          tags: ['Departments'],
          summary: 'Create Department (Admin Only)',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string', example: 'Engineering' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Department created' },
            400: { description: 'Validation or duplicate name error' },
            403: { description: 'Forbidden (Admin role required)' },
          },
        },
      },
      '/api/departments/{id}': {
        get: {
          tags: ['Departments'],
          summary: 'Get Department By ID',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Department details' }, 404: { description: 'Department not found' } },
        },
        put: {
          tags: ['Departments'],
          summary: 'Update Department (Admin Only)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: { name: { type: 'string', example: 'Software Engineering' } },
                },
              },
            },
          },
          responses: { 200: { description: 'Department updated' }, 403: { description: 'Forbidden' } },
        },
        delete: {
          tags: ['Departments'],
          summary: 'Delete Department (Admin Only)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Department deleted' }, 403: { description: 'Forbidden' } },
        },
      },
      '/api/employees': {
        get: {
          tags: ['Employees'],
          summary: 'Get Paginated List of Employees',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
            { name: 'search', in: 'query', schema: { type: 'string' } },
            { name: 'departmentId', in: 'query', schema: { type: 'string' } },
            { name: 'sortBy', in: 'query', schema: { type: 'string', enum: ['firstName', 'lastName', 'email', 'hireDate', 'salary', 'createdAt'], default: 'createdAt' } },
            { name: 'order', in: 'query', schema: { type: 'string', enum: ['ASC', 'DESC'], default: 'DESC' } },
          ],
          responses: { 200: { description: 'List of employees' } },
        },
        post: {
          tags: ['Employees'],
          summary: 'Create Employee (Admin Only)',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['firstName', 'lastName', 'email', 'hireDate', 'salary'],
                  properties: {
                    firstName: { type: 'string', example: 'John' },
                    lastName: { type: 'string', example: 'Doe' },
                    email: { type: 'string', example: 'john.doe@example.com' },
                    hireDate: { type: 'string', example: '2024-01-15' },
                    salary: { type: 'number', example: 85000 },
                    departmentId: { type: 'string', example: 'department-uuid-here' },
                  },
                },
              },
            },
          },
          responses: { 201: { description: 'Employee created' }, 403: { description: 'Forbidden' } },
        },
      },
      '/api/employees/{id}': {
        get: {
          tags: ['Employees'],
          summary: 'Get Employee By ID',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Employee details' }, 404: { description: 'Employee not found' } },
        },
        put: {
          tags: ['Employees'],
          summary: 'Update Employee (Admin Only)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    email: { type: 'string' },
                    salary: { type: 'number' },
                    departmentId: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: { 200: { description: 'Employee updated' }, 403: { description: 'Forbidden' } },
        },
        delete: {
          tags: ['Employees'],
          summary: 'Delete Employee (Admin Only)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Employee deleted' }, 403: { description: 'Forbidden' } },
        },
      },
      '/api/dashboard/stats': {
        get: {
          tags: ['Dashboard'],
          summary: 'Get Admin Dashboard Overview Analytics',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Dashboard metrics (total employees, department stats, recent hires)' },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
