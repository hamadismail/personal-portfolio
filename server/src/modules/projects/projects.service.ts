import { prisma } from "../../config/db";
import { IProject } from "./projects.model";

const createProject = async (payload: IProject): Promise<IProject> => {
  const newProject = await prisma.project.create({
    data: payload,
  });
  return newProject;
};

const getProjects = async (): Promise<IProject[]> => {
  const projects = await prisma.project.findMany();
  return projects;
};

const getProjectById = async (id: number): Promise<IProject | null> => {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });
  return project;
};

const updateProject = async (
  id: number,
  payload: Partial<IProject>
): Promise<IProject | null> => {
  const updatedProject = await prisma.project.update({
    where: {
      id,
    },
    data: payload,
  });
  return updatedProject;
};

const deleteProject = async (id: number): Promise<IProject | null> => {
  const deletedProject = await prisma.project.delete({
    where: {
      id,
    },
  });
  return deletedProject;
};

export const ProjectService = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
