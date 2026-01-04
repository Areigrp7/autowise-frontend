import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

// const API_BASE_URL = 'https://44.220.191.221/api';

const API_BASE_URL = 'https://api.autowise.club/api';


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  config => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    console.log('Request data:', config.data);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  response => {
    console.log('API Response:', response.config.method?.toUpperCase(), response.config.url, response.status);
    console.log('Response data:', response.data);
    return response;
  },
  error => {
    console.error('API Error:', error.config?.method?.toUpperCase(), error.config?.url, error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return Promise.reject(error);
  }
);

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

export const createCheckoutSession = async (checkoutPayload: any): Promise<any> => {
  return makeApiRequest('post', '/checkout/create-checkout-session', checkoutPayload);
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

export const getVehicles = async (): Promise<any> => {
  return makeApiRequest('get', '/vehicles');
};

export const addVehicle = async (vehiclePayload: any): Promise<any> => {
  return makeApiRequest('post', '/vehicles', vehiclePayload);
};



export const getMaintenanceRecords = async (): Promise<any> => {
  return makeApiRequest('get', '/maintenance');
};

export const addMaintenanceRecord = async (recordPayload: any): Promise<any> => {
  return makeApiRequest('post', '/maintenance', recordPayload);
};

export const updateVehicle = async (vehicleId: string, vehiclePayload: any): Promise<any> => {
  return makeApiRequest('put', `/vehicles/${vehicleId}`, vehiclePayload);
};

export const deleteVehicle = async (vehicleId: string): Promise<any> => {
  return makeApiRequest('delete', `/vehicles/${vehicleId}`);
};

export const getQuoteRequests = async (): Promise<any> => {
  return makeApiRequest('get', '/quote_requests');
};

export const createQuoteRequest = async (quotePayload: any): Promise<any> => {
  return makeApiRequest('post', '/quote_requests', quotePayload);
};

export const updateQuoteRequestStatus = async (quoteId: number, status: 'Accepted' | 'Rejected' | 'Expired'): Promise<any> => {
  return makeApiRequest('put', `/quote_requests/${quoteId}/status`, { status });
};

export const getActiveQuoteRequests = async (): Promise<any> => {
  return makeApiRequest('get', '/quote_requests/active');
};

export default apiClient;
