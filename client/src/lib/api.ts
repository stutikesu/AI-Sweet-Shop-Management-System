import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSweetDto {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface ApiError {
  message: string;
  error?: string;
}

// Helper function to extract error message
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    return axiosError.response?.data?.error || axiosError.response?.data?.message || axiosError.message || 'An error occurred';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authApi = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export interface SearchParams {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const sweetsApi = {
  getAll: async (): Promise<Sweet[]> => {
    try {
      const response = await api.get<Sweet[]>('/sweets');
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  search: async (params: SearchParams): Promise<Sweet[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (params.name) queryParams.append('name', params.name);
      if (params.category) queryParams.append('category', params.category);
      if (params.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
      if (params.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());

      const response = await api.get<Sweet[]>(`/sweets/search?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  purchase: async (id: string, quantity: number, token: string): Promise<Sweet> => {
    try {
      if (quantity <= 0) {
        throw new Error('Quantity must be greater than 0');
      }
      const response = await api.post<Sweet>(`/sweets/${id}/purchase`, { quantity }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  restock: async (id: string, quantity: number, token: string): Promise<Sweet> => {
    try {
      if (quantity <= 0) {
        throw new Error('Quantity must be greater than 0');
      }
      const response = await api.post<Sweet>(`/sweets/${id}/restock`, { quantity }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  create: async (data: CreateSweetDto, token: string): Promise<Sweet> => {
    try {
      // Validate input
      if (!data.name || !data.category) {
        throw new Error('Name and category are required');
      }
      if (data.price <= 0) {
        throw new Error('Price must be greater than 0');
      }
      if (data.quantity < 0) {
        throw new Error('Quantity cannot be negative');
      }
      
      const response = await api.post<Sweet>('/sweets', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  update: async (id: string, data: Partial<CreateSweetDto>, token: string): Promise<Sweet> => {
    try {
      const response = await api.put<Sweet>(`/sweets/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  delete: async (id: string, token: string): Promise<void> => {
    try {
      await api.delete(`/sweets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default api;

