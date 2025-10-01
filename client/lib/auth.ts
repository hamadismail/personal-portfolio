import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = async (credentials: LoginCredentials) => {
  const response = await axios.post(`http://localhost:5000/api/v1/auth/login`, credentials, {
    withCredentials: true,
  });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    withCredentials: true,
  });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_URL}/auth/logout`, null, {
    withCredentials: true,
  });
  return response.data;
};
