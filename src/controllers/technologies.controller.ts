import { Request, response, Response } from "express";
import { ITechnologiesRequest } from "../interfaces/technologies.interface";
import { createTechnologyService } from "../services/Technologies/createTechnologies.service";
import { listAllProjectsByTechnologieService } from "../services/Technologies/listAllProjectsByTechnologies.service";
import listTechnologyService from "../services/Technologies/listTechnology.service";

const createTechnologyController = async (req: Request, res: Response) => {
  const { name } = req.body;

  const newTechnology = await createTechnologyService(name);

  return res.status(201).json(newTechnology);
};

const listTechnologyController = async (req: Request, res: Response) => {
  const technologies = await listTechnologyService();

  return res.status(200).json(technologies);
};

const listAllProjectsByTechnologieController = async (
  req: Request,
  res: Response
) => {
  const idTech: number = parseInt(req.params.id);

  const projectsByTechnologie = await listAllProjectsByTechnologieService(
    idTech
  );

  return res.json(projectsByTechnologie);
};

export {
  createTechnologyController,
  listTechnologyController,
  listAllProjectsByTechnologieController,
};
