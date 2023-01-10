import { Router } from "express";
import {
  createProjectController,
  insertTechnologiesToProjectController,
  listAllProjectsController,
  listAllTechnologiesByProjectController,
  listUserProjectController,
} from "../controllers/projects.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const projectRoutes = Router();

projectRoutes.post("", ensureAuthMiddleware, createProjectController);
projectRoutes.get("", listAllProjectsController);
projectRoutes.get(
  "/users/:id",
  ensureAuthMiddleware,
  listUserProjectController
);
projectRoutes.get("/:id/technologies", listAllTechnologiesByProjectController);
projectRoutes.post("/:id/technologies", insertTechnologiesToProjectController);

export default projectRoutes;
