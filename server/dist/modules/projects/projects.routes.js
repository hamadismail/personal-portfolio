"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const express_1 = __importDefault(require("express"));
const projects_controller_1 = require("./projects.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.authenticate, projects_controller_1.ProjectController.createProject);
router.get("/", projects_controller_1.ProjectController.getProjects);
router.get("/:id", projects_controller_1.ProjectController.getProjectById);
router.put("/:id", auth_middleware_1.authenticate, projects_controller_1.ProjectController.updateProject);
router.delete("/:id", auth_middleware_1.authenticate, projects_controller_1.ProjectController.deleteProject);
exports.projectRouter = router;
