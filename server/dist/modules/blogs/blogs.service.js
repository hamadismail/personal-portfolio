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
exports.BlogService = void 0;
const db_1 = require("../../config/db");
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlog = yield db_1.prisma.blogs.create({
        data: payload,
    });
    return newBlog;
});
const getBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield db_1.prisma.blogs.findMany();
    return blogs;
});
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield db_1.prisma.blogs.findUnique({
        where: {
            id,
        },
    });
    return blog;
});
const updateBlog = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBlog = yield db_1.prisma.blogs.update({
        where: {
            id,
        },
        data: payload,
    });
    return updatedBlog;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBlog = yield db_1.prisma.blogs.delete({
        where: {
            id,
        },
    });
    return deletedBlog;
});
exports.BlogService = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
