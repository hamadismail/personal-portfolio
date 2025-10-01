import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export const login = async (credentials: any) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials, {
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
