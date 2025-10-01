import { IProject } from '@/types/project';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export const createProject = async (data: IProject) => {
  const response = await axios.post(`${API_URL}/projects`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const getProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};

export const deleteProject = async (id: number) => {
  const response = await axios.delete(`${API_URL}/projects/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
