"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryEmployeeDto = exports.UpdateEmployeeDto = exports.CreateEmployeeDto = void 0;
const zod_1 = require("zod");
// Employee creation DTO schema
exports.CreateEmployeeDto = zod_1.z.object({
    firstName: zod_1.z.string().min(2, 'First name must be at least 2 characters').max(100),
    lastName: zod_1.z.string().min(2, 'Last name must be at least 2 characters').max(100),
    email: zod_1.z.string().email('Invalid email address format'),
    hireDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid ISO date format' }),
    salary: zod_1.z.coerce.number().positive('Salary must be a positive number'),
    departmentId: zod_1.z.string().uuid('Invalid department UUID').optional().nullable(),
});
// Employee update DTO schema
exports.UpdateEmployeeDto = exports.CreateEmployeeDto.partial();
// Employee query parameters DTO schema (Search, Filtering, Sorting, Pagination)
exports.QueryEmployeeDto = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().optional().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).optional().default(10),
    search: zod_1.z.string().optional(),
    departmentId: zod_1.z.string().optional(),
    sortBy: zod_1.z.enum(['firstName', 'lastName', 'email', 'hireDate', 'salary', 'createdAt']).optional().default('createdAt'),
    order: zod_1.z.enum(['ASC', 'DESC']).optional().default('DESC'),
});
