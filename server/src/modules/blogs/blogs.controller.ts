import { Request, Response } from "express";
import { BlogService } from "./blogs.service";

const createBlog = async (req: Request, res: Response) => {
  try {
    const newBlog = await BlogService.createBlog(req.body);
    res.status(201).json(newBlog);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogService.getBlogs();
    res.status(200).json(blogs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await BlogService.getBlogById(parseInt(req.params.id));
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
    } else {
      res.status(200).json(blog);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    const updatedBlog = await BlogService.updateBlog(
      parseInt(req.params.id),
      req.body
    );
    if (!updatedBlog) {
      res.status(404).json({ message: "Blog not found" });
    } else {
      res.status(200).json(updatedBlog);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deletedBlog = await BlogService.deleteBlog(parseInt(req.params.id));
    if (!deletedBlog) {
      res.status(404).json({ message: "Blog not found" });
    } else {
      res.status(200).json(deletedBlog);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const BlogController = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
