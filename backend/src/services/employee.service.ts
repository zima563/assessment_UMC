import { AppDataSource } from '../config/data-source';
import { Employee } from '../entities/Employee';
import { Department } from '../entities/Department';
import { CreateEmployeeDtoType, UpdateEmployeeDtoType, QueryEmployeeDtoType } from '../dtos/employee.dto';

export class EmployeeService {
  private employeeRepository = AppDataSource.getRepository(Employee);
  private departmentRepository = AppDataSource.getRepository(Department);

  // Fetch paginated employees with dynamic search, department filtering, and relations
  async getAll(query: QueryEmployeeDtoType) {
    const { page, limit, search, departmentId, sortBy, order } = query;

    const queryBuilder = this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.department', 'department');

    if (search && search.trim() !== '') {
      const searchTerm = `%${search.trim()}%`;
      queryBuilder.andWhere(
        '(employee.firstName LIKE :search OR employee.lastName LIKE :search OR employee.email LIKE :search)',
        { search: searchTerm }
      );
    }

    if (departmentId && departmentId.trim() !== '') {
      queryBuilder.andWhere('employee.departmentId = :departmentId', { departmentId });
    }

    queryBuilder
      .orderBy(`employee.${sortBy}`, order)
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

  // Find employee by ID with department details
  async getById(id: string) {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['department'],
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }

  // Create new employee record after validating email uniqueness and department existence
  async create(data: CreateEmployeeDtoType) {
    const existingEmail = await this.employeeRepository.findOne({
      where: { email: data.email },
    });

    if (existingEmail) {
      throw new Error('An employee with this email already exists');
    }

    if (data.departmentId) {
      const departmentExists = await this.departmentRepository.findOne({
        where: { id: data.departmentId },
      });
      if (!departmentExists) {
        throw new Error('Specified department does not exist');
      }
    }

    const employee = this.employeeRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      hireDate: new Date(data.hireDate),
      salary: data.salary,
      departmentId: data.departmentId || undefined,
    });

    return this.employeeRepository.save(employee);
  }

  // Update existing employee record
  async update(id: string, data: UpdateEmployeeDtoType) {
    const employee = await this.getById(id);

    if (data.email && data.email !== employee.email) {
      const existingEmail = await this.employeeRepository.findOne({
        where: { email: data.email },
      });
      if (existingEmail) {
        throw new Error('An employee with this email already exists');
      }
    }

    if (data.departmentId && data.departmentId !== employee.departmentId) {
      const departmentExists = await this.departmentRepository.findOne({
        where: { id: data.departmentId },
      });
      if (!departmentExists) {
        throw new Error('Specified department does not exist');
      }
    }

    if (data.firstName !== undefined) employee.firstName = data.firstName;
    if (data.lastName !== undefined) employee.lastName = data.lastName;
    if (data.email !== undefined) employee.email = data.email;
    if (data.hireDate !== undefined) employee.hireDate = new Date(data.hireDate);
    if (data.salary !== undefined) employee.salary = data.salary;
    if (data.departmentId !== undefined) employee.departmentId = data.departmentId || undefined;

    return this.employeeRepository.save(employee);
  }

  // Delete employee record by ID
  async delete(id: string) {
    const employee = await this.getById(id);
    await this.employeeRepository.remove(employee);
    return { id };
  }
}

export const employeeService = new EmployeeService();
