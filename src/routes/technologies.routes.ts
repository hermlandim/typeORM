import { Router } from "express";
import {
  createTechnologyController,
  listAllProjectsByTechnologieController,
  listTechnologyController,
} from "../controllers/technologies.controller";

const technologiesRoutes = Router();

technologiesRoutes.post("", createTechnologyController);
technologiesRoutes.get("", listTechnologyController);
technologiesRoutes.get("/:id/projects", listAllProjectsByTechnologieController);

export { technologiesRoutes };
