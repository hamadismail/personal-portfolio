"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const blogs_service_1 = require("./blogs.service");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBlog = yield blogs_service_1.BlogService.createBlog(req.body);
        res.status(201).json(newBlog);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogs_service_1.BlogService.getBlogs();
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blogs_service_1.BlogService.getBlogById(parseInt(req.params.id));
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
        }
        else {
            res.status(200).json(blog);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBlog = yield blogs_service_1.BlogService.updateBlog(parseInt(req.params.id), req.body);
        if (!updatedBlog) {
            res.status(404).json({ message: "Blog not found" });
        }
        else {
            res.status(200).json(updatedBlog);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBlog = yield blogs_service_1.BlogService.deleteBlog(parseInt(req.params.id));
        if (!deletedBlog) {
            res.status(404).json({ message: "Blog not found" });
        }
        else {
            res.status(200).json(deletedBlog);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.BlogController = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
