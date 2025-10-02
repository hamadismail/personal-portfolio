import { IProject } from "@/types/project";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API;

export const createProject = async (data: Partial<IProject>) => {
  const response = await axios.post(`${API_URL}/projects`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const getProject = async (id: number) => {
  const response = await axios.get(`${API_URL}/projects/${id}`);
  return response.data;
};

export const getProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};

export const updateProject = async (id: number, data: IProject) => {
  const response = await axios.put(`${API_URL}/projects/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteProject = async (id: number) => {
  const response = await axios.delete(`${API_URL}/projects/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
