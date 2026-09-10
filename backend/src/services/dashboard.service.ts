import { AppDataSource } from '../config/data-source';
import { Employee } from '../entities/Employee';
import { Department } from '../entities/Department';

export class DashboardService {
  private employeeRepository = AppDataSource.getRepository(Employee);
  private departmentRepository = AppDataSource.getRepository(Department);

  // Aggregate dashboard analytics: total counts, department distribution, and recent hires
  async getDashboardMetrics() {
    // 1. Total count of active employees
    const totalEmployees = await this.employeeRepository.count();

    // 2. Total count of departments
    const totalDepartments = await this.departmentRepository.count();

    // 3. Department distribution stats (Department name -> Employee count)
    const departmentDistributionRaw = await this.departmentRepository
      .createQueryBuilder('department')
      .leftJoin('department.employees', 'employee')
      .select('department.id', 'departmentId')
      .addSelect('department.name', 'departmentName')
      .addSelect('COUNT(employee.id)', 'employeeCount')
      .groupBy('department.id')
      .addGroupBy('department.name')
      .getRawMany();

    const departmentDistribution = departmentDistributionRaw.map((row) => ({
      departmentId: row.departmentId,
      departmentName: row.departmentName,
      employeeCount: Number(row.employeeCount),
    }));

    // 4. Fetch 5 most recent employee hires
    const recentHires = await this.employeeRepository.find({
      relations: ['department'],
      order: { hireDate: 'DESC' },
      take: 5,
    });

    return {
      totalEmployees,
      totalDepartments,
      departmentDistribution,
      recentHires,
    };
  }
}

export const dashboardService = new DashboardService();
