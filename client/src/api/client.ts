// Define your base URL
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

type CustomHeaders = Record<string, string> & {
  Authorization?: string;
};

async function apiClient<T>(
  endpoint: string,
  config: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem('token');
  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const headers: CustomHeaders = {
    ...baseHeaders,
    ...(config.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const requestConfig: RequestInit = {
    ...config,
    headers,
    credentials: 'include',
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, requestConfig);

  if (response.ok) {
    if (response.status === 204) {
      return undefined as T;
    }
    return response.json();
  }

  const error = await response.json();
  throw new Error(error.message || 'Request failed');
}

export async function get<T>(
  endpoint: string,
  config?: RequestInit,
): Promise<T> {
  return apiClient<T>(endpoint, { ...config, method: 'GET' });
}

export async function post<T>(
  endpoint: string,
  body?: any,
  config?: RequestInit,
): Promise<T> {
  return apiClient<T>(endpoint, {
    ...config,
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function put<T>(
  endpoint: string,
  body?: any,
  config?: RequestInit,
): Promise<T> {
  return apiClient<T>(endpoint, {
    ...config,
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function del<T>(
  endpoint: string,
  config?: RequestInit,
): Promise<T> {
  return apiClient<T>(endpoint, { ...config, method: 'DELETE' });
}

export default {
  get,
  post,
  put,
  delete: del,
};
