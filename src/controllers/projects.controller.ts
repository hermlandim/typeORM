import { Request, Response } from "express";
import { IProjectRequest } from "../interfaces/projects.interfaces";
import { ITechnologyProject } from "../interfaces/technologies.interface";
import createProjectService from "../services/projects/createProject.service";
import insertTechnologiesToProjectService from "../services/projects/insertTechnologiesToProject.service";
import listAllProjectsService from "../services/projects/listAllProjects.service";
import { listAllTechnologiesByProjectService } from "../services/projects/listAllTechnologiesByProject.service";
import { listUserProjectService } from "../services/projects/listUserProject.service";

const createProjectController = async (req: Request, res: Response) => {
  const projectData: IProjectRequest = req.body;
  const userId: number = req.user.id;

  const newProject = await createProjectService(projectData, userId);

  return res.status(201).json(newProject);
};

const listUserProjectController = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  const userProject = await listUserProjectService(userId);

  return res.json(userProject);
};

const listAllProjectsController = async (req: Request, res: Response) => {
  const projects = await listAllProjectsService();

  return res.status(200).json(projects);
};

const insertTechnologiesToProjectController = async (
  req: Request,
  res: Response
) => {
  const technologies: ITechnologyProject = req.body;
  const projectId: number = parseInt(req.params.id);

  const response = await insertTechnologiesToProjectService(
    technologies,
    projectId
  );

  return res.json({
    message: response,
  });
};

const listAllTechnologiesByProjectController = async (
  req: Request,
  res: Response
) => {
  const projectId: number = parseInt(req.params.id);

  const technologiesByProject = await listAllTechnologiesByProjectService(
    projectId
  );

  return res.json(technologiesByProject);
};

export {
  createProjectController,
  listUserProjectController,
  insertTechnologiesToProjectController,
  listAllProjectsController,
  listAllTechnologiesByProjectController,
};
