import { Router } from "express";
import {
  createUserController,
  listUserByIdController,
  listUsersController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { userSchema } from "../schemas/user.schema";

const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  createUserController
);
userRoutes.get("", ensureAuthMiddleware, listUsersController);
userRoutes.get("/:id", listUserByIdController);

export default userRoutes;
