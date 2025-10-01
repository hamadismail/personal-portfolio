import express from "express";
import { BlogController } from "./blogs.controller";
import { authenticate } from "../auth/auth.middleware";

const router = express.Router();

router.post("/", authenticate, BlogController.createBlog);
router.get("/", BlogController.getBlogs);
router.get("/:id", BlogController.getBlogById);
router.put("/:id", authenticate, BlogController.updateBlog);
router.delete("/:id", authenticate, BlogController.deleteBlog);

export const blogRouter = router;
