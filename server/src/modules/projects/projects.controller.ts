import { Request, Response } from "express";
import { ProjectService } from "./projects.service";

const createProject = async (req: Request, res: Response) => {
  try {
    const newProject = await ProjectService.createProject(req.body);
    res.status(201).json(newProject);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectService.getProjects();
    res.status(200).json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await ProjectService.getProjectById(parseInt(req.params.id));
    if (!project) {
      res.status(404).json({ message: "Project not found" });
    } else {
      res.status(200).json(project);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    const updatedProject = await ProjectService.updateProject(
      parseInt(req.params.id),
      req.body
    );
    if (!updatedProject) {
      res.status(404).json({ message: "Project not found" });
    } else {
      res.status(200).json(updatedProject);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    const deletedProject = await ProjectService.deleteProject(
      parseInt(req.params.id)
    );
    if (!deletedProject) {
      res.status(404).json({ message: "Project not found" });
    } else {
      res.status(200).json(deletedProject);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const ProjectController = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
