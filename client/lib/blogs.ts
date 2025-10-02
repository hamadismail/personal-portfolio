import { IBlog } from "@/types/blog";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API;

export const getBlog = async (id: number) => {
  const response = await axios.get(`${API_URL}/blogs/${id}`);
  return response.data;
};

export const updateBlog = async (id: number, data: IBlog) => {
  const response = await axios.put(`${API_URL}/blogs/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const createBlog = async (data: Partial<IBlog>) => {
  const response = await axios.post(`${API_URL}/blogs`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const getBlogs = async () => {
  const response = await axios.get(`${API_URL}/blogs`);
  return response.data;
};

export const deleteBlog = async (id: number) => {
  const response = await axios.delete(`${API_URL}/blogs/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
