"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentService = exports.DepartmentService = void 0;
const data_source_1 = require("../config/data-source");
const Department_1 = require("../entities/Department");
class DepartmentService {
    departmentRepository = data_source_1.AppDataSource.getRepository(Department_1.Department);
    // Fetch paginated departments with optional search and employee count aggregation
    async getAll(query) {
        const { page, limit, search, sortBy, order } = query;
        const queryBuilder = this.departmentRepository
            .createQueryBuilder('department')
            .leftJoinAndSelect('department.employees', 'employee')
            .loadRelationCountAndMap('department.employeeCount', 'department.employees');
        if (search && search.trim() !== '') {
            queryBuilder.where('department.name LIKE :search', { search: `%${search.trim()}%` });
        }
        queryBuilder
            .orderBy(`department.${sortBy}`, order)
            .skip((page - 1) * limit)
            .take(limit);
        const [items, total] = await queryBuilder.getManyAndCount();
        return {
            items,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    // Find department by ID with associated employee details
    async getById(id) {
        const department = await this.departmentRepository.findOne({
            where: { id },
            relations: ['employees'],
        });
        if (!department) {
            throw new Error('Department not found');
        }
        return department;
    }
    // Create new department after validating unique name constraint
    async create(data) {
        const existing = await this.departmentRepository.findOne({
            where: { name: data.name },
        });
        if (existing) {
            throw new Error('Department with this name already exists');
        }
        const department = this.departmentRepository.create({
            name: data.name,
        });
        return this.departmentRepository.save(department);
    }
    // Update existing department name
    async update(id, data) {
        const department = await this.getById(id);
        if (data.name !== department.name) {
            const existing = await this.departmentRepository.findOne({
                where: { name: data.name },
            });
            if (existing) {
                throw new Error('Department with this name already exists');
            }
        }
        department.name = data.name;
        return this.departmentRepository.save(department);
    }
    // Delete department by ID
    async delete(id) {
        const department = await this.getById(id);
        await this.departmentRepository.remove(department);
        return { id };
    }
}
exports.DepartmentService = DepartmentService;
exports.departmentService = new DepartmentService();
