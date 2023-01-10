import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";
import listUserByIdService from "../services/users/listUserById.service";
import listUsersService from "../services/users/listUsers.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();

  return res.status(200).json(users);
};

const listUserByIdController = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  const users = await listUserByIdService(userId);

  return res.status(200).json(users);
};

export { createUserController, listUsersController, listUserByIdController };
