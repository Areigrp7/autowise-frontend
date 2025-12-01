import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'https://44.220.191.221/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const makeApiRequest = async <T>(method: 'get' | 'post' | 'put' | 'delete', url: string, data?: any): Promise<T> => {
  try {
    const response = await apiClient[method](url, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const createOrder = async (orderPayload: any): Promise<any> => {
  return makeApiRequest('post', '/checkout/orders', orderPayload);
};

export const fetchParts = async (params?: { year?: string; make?: string; model?: string; q?: string }): Promise<any> => {
  const query = new URLSearchParams();
  if (params?.year) query.append('year', params.year);
  if (params?.make) query.append('make', params.make);
  if (params?.model) query.append('model', params.model);
  if (params?.q) query.append('q', params.q);

  const queryString = query.toString();
  const url = `/search/parts${queryString ? `?${queryString}` : ''}`;
  return makeApiRequest('get', url);
};

export default apiClient;
