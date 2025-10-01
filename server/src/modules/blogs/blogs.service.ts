import { prisma } from "../../config/db";
import { IBlog } from "./blogs.model";

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const newBlog = await prisma.blogs.create({
    data: payload,
  });
  return newBlog;
};

const getBlogs = async (): Promise<IBlog[]> => {
  const blogs = await prisma.blogs.findMany();
  return blogs;
};

const getBlogById = async (id: number): Promise<IBlog | null> => {
  const blog = await prisma.blogs.findUnique({
    where: {
      id,
    },
  });
  return blog;
};

const updateBlog = async (
  id: number,
  payload: Partial<IBlog>
): Promise<IBlog | null> => {
  const updatedBlog = await prisma.blogs.update({
    where: {
      id,
    },
    data: payload,
  });
  return updatedBlog;
};

const deleteBlog = async (id: number): Promise<IBlog | null> => {
  const deletedBlog = await prisma.blogs.delete({
    where: {
      id,
    },
  });
  return deletedBlog;
};

export const BlogService = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
