import { z } from 'zod';

// Employee creation DTO schema
export const CreateEmployeeDto = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(100),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address format'),
  hireDate: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid ISO date format' }),
  salary: z.coerce.number().positive('Salary must be a positive number'),
  departmentId: z.string().uuid('Invalid department UUID').optional().nullable(),
});

export type CreateEmployeeDtoType = z.infer<typeof CreateEmployeeDto>;

// Employee update DTO schema
export const UpdateEmployeeDto = CreateEmployeeDto.partial();

export type UpdateEmployeeDtoType = z.infer<typeof UpdateEmployeeDto>;

// Employee query parameters DTO schema (Search, Filtering, Sorting, Pagination)
export const QueryEmployeeDto = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  departmentId: z.string().optional(),
  sortBy: z.enum(['firstName', 'lastName', 'email', 'hireDate', 'salary', 'createdAt']).optional().default('createdAt'),
  order: z.enum(['ASC', 'DESC']).optional().default('DESC'),
});

export type QueryEmployeeDtoType = z.infer<typeof QueryEmployeeDto>;
