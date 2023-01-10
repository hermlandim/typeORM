import { Request, Response } from "express";
import { ISessionRequest } from "../interfaces/session.interfaces";
import createSessionService from "../services/sessions/createSession.service";

const createSessionController = async (req: Request, resp: Response) => {
  const sessionData: ISessionRequest = req.body;

  const token = await createSessionService(sessionData);

  return resp.json({ token });
};

export { createSessionController };
