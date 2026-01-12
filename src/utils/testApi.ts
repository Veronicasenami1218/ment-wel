import apiClient from '../config/api';

export const testApiConnection = async () => {
  try {
    console.log('Testing API connection...');
    console.log('API Base URL:', apiClient.defaults.baseURL);
    
    // Test basic connection
    const response = await apiClient.get('/');
    console.log('API Response:', response.data);
    return true;
  } catch (error: any) {
    console.error('API Connection Test Failed:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    return false;
  }
};

export const testRegistration = async () => {
  const testUser = {
    email: 'test@example.com',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    firstName: 'Test',
    lastName: 'User',
    dateOfBirth: '1990-01-01',
    gender: 'male' as const,
    country: 'Nigeria',
    acceptTerms: true,
    role: 'user'
  };

  try {
    console.log('Testing registration endpoint...');
    const response = await apiClient.post('/v1/auth/register', testUser);
    console.log('Registration Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Registration Test Failed:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    throw error;
  }
};