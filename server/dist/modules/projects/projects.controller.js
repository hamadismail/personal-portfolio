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
exports.ProjectController = void 0;
const projects_service_1 = require("./projects.service");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProject = yield projects_service_1.ProjectService.createProject(req.body);
        res.status(201).json(newProject);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield projects_service_1.ProjectService.getProjects();
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield projects_service_1.ProjectService.getProjectById(parseInt(req.params.id));
        if (!project) {
            res.status(404).json({ message: "Project not found" });
        }
        else {
            res.status(200).json(project);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProject = yield projects_service_1.ProjectService.updateProject(parseInt(req.params.id), req.body);
        if (!updatedProject) {
            res.status(404).json({ message: "Project not found" });
        }
        else {
            res.status(200).json(updatedProject);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProject = yield projects_service_1.ProjectService.deleteProject(parseInt(req.params.id));
        if (!deletedProject) {
            res.status(404).json({ message: "Project not found" });
        }
        else {
            res.status(200).json(deletedProject);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.ProjectController = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
