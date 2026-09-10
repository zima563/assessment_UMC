import apiClient from './axios';
import { ApiResponse, Department, PaginatedData } from '../types';

export interface GetDepartmentsParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}

export async function getDepartmentsApi(params?: GetDepartmentsParams): Promise<PaginatedData<Department>> {
  const response = await apiClient.get<ApiResponse<PaginatedData<Department>>>('/departments', { params });
  return response.data.data;
}

export async function getDepartmentByIdApi(id: string): Promise<Department> {
  const response = await apiClient.get<ApiResponse<Department>>(`/departments/${id}`);
  return response.data.data;
}

export async function createDepartmentApi(payload: { name: string }): Promise<Department> {
  const response = await apiClient.post<ApiResponse<Department>>('/departments', payload);
  return response.data.data;
}

export async function updateDepartmentApi(id: string, payload: { name: string }): Promise<Department> {
  const response = await apiClient.put<ApiResponse<Department>>(`/departments/${id}`, payload);
  return response.data.data;
}

export async function deleteDepartmentApi(id: string): Promise<void> {
  await apiClient.delete(`/departments/${id}`);
}
