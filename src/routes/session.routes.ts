import { Router } from "express";
import { createSessionController } from "../controllers/session.controller";

const sessionsRoutes = Router();

sessionsRoutes.post("", createSessionController);

export default sessionsRoutes;
