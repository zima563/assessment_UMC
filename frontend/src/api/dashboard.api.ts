import apiClient from './axios';
import { ApiResponse, DashboardMetrics } from '../types';

export async function getDashboardStatsApi(): Promise<DashboardMetrics> {
  const response = await apiClient.get<ApiResponse<DashboardMetrics>>('/dashboard/stats');
  return response.data.data;
}
