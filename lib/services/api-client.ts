/** API client: axios instance + auth and authenticated request helpers */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/constants/api';
import type { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Re-export types for convenience
export type { LoginCredentials, RegisterData, AuthResponse };

/** Login user*/
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await axiosInstance.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    const data = response.data;

    return data;
  } catch (error: unknown) {
    // Return API error response so caller can display the message
    if (axios.isAxiosError(error) && error.response?.data) {
      const data = error.response.data as { success?: boolean; error?: string };
      return {
        success: false,
        error: data.error,
      };
    }
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

/** Register new user*/
export async function register(userData: RegisterData): Promise<AuthResponse> {
  const response = await axiosInstance.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, userData);
  return response.data;
}

/** Get current authenticated user (cookie sent automatically) */
export async function getCurrentUser(): Promise<{
  success: boolean;
  data?: {
    user: {
      id: number;
      email: string;
      name: string;
      role?: string;
      created_at: Date;
    };
  };
  error?: string;
}> {
  const response = await axiosInstance.get<{
    success: boolean;
    data?: {
      user: {
        id: number;
        email: string;
        name: string;
        role?: string;
        created_at: Date;
      };
    };
    error?: string;
  }>(API_ENDPOINTS.AUTH.ME);

  return response.data;
}

/** Logout user (API clears auth cookie) */
export async function logout(): Promise<void> {
  try {
    await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
  } catch (error) {
    console.error('Logout error:', error);
  }
}

/** Make authenticated API request (cookie sent automatically for same-origin) */
export async function authenticatedFetch(
  url: string,
  options: AxiosRequestConfig & { body?: any } = {}
): Promise<any> {
  const isAbsoluteUrl = url.startsWith('http://') || url.startsWith('https://');
  const { body, ...axiosOptions } = options;
  const data = axiosOptions.data || (body ? (typeof body === 'string' ? JSON.parse(body) : body) : undefined);

  const config: AxiosRequestConfig = {
    ...axiosOptions,
    method: (axiosOptions.method as any) || 'GET',
    url: isAbsoluteUrl ? url : url.replace(API_BASE_URL, ''),
    headers: {
      'Content-Type': 'application/json',
      ...axiosOptions.headers,
    },
    ...(data && { data }),
    withCredentials: true,
  };

  const instance = isAbsoluteUrl ? axios : axiosInstance;
  try {
    const response = await instance.request(config);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
}
