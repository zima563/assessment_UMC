"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = exports.DashboardService = void 0;
const data_source_1 = require("../config/data-source");
const Employee_1 = require("../entities/Employee");
const Department_1 = require("../entities/Department");
class DashboardService {
    employeeRepository = data_source_1.AppDataSource.getRepository(Employee_1.Employee);
    departmentRepository = data_source_1.AppDataSource.getRepository(Department_1.Department);
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
exports.DashboardService = DashboardService;
exports.dashboardService = new DashboardService();
