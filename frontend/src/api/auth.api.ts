import apiClient from './axios';
import { ApiResponse, AuthResponse } from '../types';

export async function loginApi(credentials: { username: string; password: string }): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
  return response.data.data;
}

export async function registerApi(payload: { username: string; password: string; role?: string }): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', payload);
  return response.data.data;
}

export async function getCurrentUserApi() {
  const response = await apiClient.get('/auth/me');
  return response.data;
}
