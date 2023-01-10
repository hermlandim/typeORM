import { Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";

const listAllProjectsService = async () => {
  //   const projectRepository = AppDataSource.getRepository(Project);

  //   const project = await projectRepository.createQueryBuilder().getMany();

  //   return project;

  const projects = await AppDataSource.createQueryBuilder()
    .select(["projects.id", "projects.name"])
    .from(Project, "projects")
    .getMany();

  return projects;
};

export default listAllProjectsService;
