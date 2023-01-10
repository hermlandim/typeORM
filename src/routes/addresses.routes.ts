import { Router } from "express";
import { createAddressesController } from "../controllers/addresses.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const addressesRoutes = Router();

addressesRoutes.post("", ensureAuthMiddleware, createAddressesController);

export default addressesRoutes;
