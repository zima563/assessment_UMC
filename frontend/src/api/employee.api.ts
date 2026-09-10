import apiClient from './axios';
import { ApiResponse, Employee, PaginatedData } from '../types';

export interface GetEmployeesParams {
  page?: number;
  limit?: number;
  search?: string;
  departmentId?: string;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}

export interface EmployeePayload {
  firstName: string;
  lastName: string;
  email: string;
  hireDate: string;
  salary: number;
  departmentId?: string | null;
}

export async function getEmployeesApi(params?: GetEmployeesParams): Promise<PaginatedData<Employee>> {
  const response = await apiClient.get<ApiResponse<PaginatedData<Employee>>>('/employees', { params });
  return response.data.data;
}

export async function getEmployeeByIdApi(id: string): Promise<Employee> {
  const response = await apiClient.get<ApiResponse<Employee>>(`/employees/${id}`);
  return response.data.data;
}

export async function createEmployeeApi(payload: EmployeePayload): Promise<Employee> {
  const response = await apiClient.post<ApiResponse<Employee>>('/employees', payload);
  return response.data.data;
}

export async function updateEmployeeApi(id: string, payload: Partial<EmployeePayload>): Promise<Employee> {
  const response = await apiClient.put<ApiResponse<Employee>>(`/employees/${id}`, payload);
  return response.data.data;
}

export async function deleteEmployeeApi(id: string): Promise<void> {
  await apiClient.delete(`/employees/${id}`);
}
