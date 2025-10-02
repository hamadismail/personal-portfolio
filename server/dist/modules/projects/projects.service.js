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
exports.ProjectService = void 0;
const db_1 = require("../../config/db");
const createProject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProject = yield db_1.prisma.project.create({
            data: payload,
        });
        return newProject;
    }
    catch (error) {
        console.log("Failed to create project");
        throw error;
    }
});
const getProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield db_1.prisma.project.findMany();
    return projects;
});
const getProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield db_1.prisma.project.findUnique({
        where: {
            id,
        },
    });
    return project;
});
const updateProject = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProject = yield db_1.prisma.project.update({
        where: {
            id,
        },
        data: payload,
    });
    return updatedProject;
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProject = yield db_1.prisma.project.delete({
        where: {
            id,
        },
    });
    return deletedProject;
});
exports.ProjectService = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
