import { z } from 'zod';

// Department creation DTO schema
export const CreateDepartmentDto = z.object({
  name: z.string().min(2, 'Department name must be at least 2 characters long').max(100, 'Department name cannot exceed 100 characters'),
});

export type CreateDepartmentDtoType = z.infer<typeof CreateDepartmentDto>;

// Department update DTO schema
export const UpdateDepartmentDto = z.object({
  name: z.string().min(2, 'Department name must be at least 2 characters long').max(100, 'Department name cannot exceed 100 characters'),
});

export type UpdateDepartmentDtoType = z.infer<typeof UpdateDepartmentDto>;

// Department query parameters DTO schema (Search, Sort, Pagination)
export const QueryDepartmentDto = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'createdAt']).optional().default('createdAt'),
  order: z.enum(['ASC', 'DESC']).optional().default('DESC'),
});

export type QueryDepartmentDtoType = z.infer<typeof QueryDepartmentDto>;
