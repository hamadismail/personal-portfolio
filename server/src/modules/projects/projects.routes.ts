import express from "express";
import { ProjectController } from "./projects.controller";
import { authenticate } from "../auth/auth.middleware";

const router = express.Router();

router.post("/", authenticate, ProjectController.createProject);
router.get("/", ProjectController.getProjects);
router.get("/:id", ProjectController.getProjectById);
router.put("/:id", authenticate, ProjectController.updateProject);
router.delete("/:id", authenticate, ProjectController.deleteProject);

export const projectRouter = router;
