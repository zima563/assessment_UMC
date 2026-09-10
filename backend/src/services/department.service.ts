import { AppDataSource } from '../config/data-source';
import { Department } from '../entities/Department';
import { CreateDepartmentDtoType, UpdateDepartmentDtoType, QueryDepartmentDtoType } from '../dtos/department.dto';

export class DepartmentService {
  private departmentRepository = AppDataSource.getRepository(Department);

  // Fetch paginated departments with optional search and employee count aggregation
  async getAll(query: QueryDepartmentDtoType) {
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
  async getById(id: string) {
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
  async create(data: CreateDepartmentDtoType) {
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
  async update(id: string, data: UpdateDepartmentDtoType) {
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
  async delete(id: string) {
    const department = await this.getById(id);
    await this.departmentRepository.remove(department);
    return { id };
  }
}

export const departmentService = new DepartmentService();
