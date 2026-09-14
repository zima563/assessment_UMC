"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryDepartmentDto = exports.UpdateDepartmentDto = exports.CreateDepartmentDto = void 0;
const zod_1 = require("zod");
// Department creation DTO schema
exports.CreateDepartmentDto = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Department name must be at least 2 characters long').max(100, 'Department name cannot exceed 100 characters'),
});
// Department update DTO schema
exports.UpdateDepartmentDto = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Department name must be at least 2 characters long').max(100, 'Department name cannot exceed 100 characters'),
});
// Department query parameters DTO schema (Search, Sort, Pagination)
exports.QueryDepartmentDto = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().optional().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).optional().default(10),
    search: zod_1.z.string().optional(),
    sortBy: zod_1.z.enum(['name', 'createdAt']).optional().default('createdAt'),
    order: zod_1.z.enum(['ASC', 'DESC']).optional().default('DESC'),
});
