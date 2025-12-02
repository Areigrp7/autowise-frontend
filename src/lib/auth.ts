import { makeApiRequest } from './apiClient';

// const API_BASE_URL = 'http://localhost:5000/api/auth';
const API_BASE_URL = 'https://api.autowise.club/api/auth';


export const registerUser = async (userData: any) => {
  try {
    const response = await makeApiRequest('post', '/auth/register', userData);
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials: any) => {
  try {
    const response = await makeApiRequest('post', '/auth/login', credentials);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};
