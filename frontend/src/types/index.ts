export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User',
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export interface Department {
  id: string;
  name: string;
  employeeCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  hireDate: string;
  salary: number;
  departmentId?: string | null;
  department?: Department;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedData<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface DepartmentDistribution {
  departmentId: string;
  departmentName: string;
  employeeCount: number;
}

export interface DashboardMetrics {
  totalEmployees: number;
  totalDepartments: number;
  departmentDistribution: DepartmentDistribution[];
  recentHires: Employee[];
}
