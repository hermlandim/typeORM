import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";
import { Technology } from "../../entities/technology.entity";
import { TechnologyToProject } from "../../entities/technologyToProject.entity";
import { ITechnologyProject } from "../../interfaces/technologies.interface";
import { createTechnologyService } from "../Technologies/createTechnologies.service";

const insertTechnologiesToProjectService = async (
  technologies: ITechnologyProject,
  projectId: number
) => {
  const projectRepository = AppDataSource.getRepository(Project);
  const technologyRepository = AppDataSource.getRepository(Technology);
  const technologyToProjectRepository =
    AppDataSource.getRepository(TechnologyToProject);

  const project = await projectRepository.findOneBy({ id: projectId });

  technologies.technologies.forEach(async (el) => {
    let technology = await technologyRepository.findOneBy({
      name: el.name,
    });

    if (!technology) {
      technology = await createTechnologyService(el.name);
    }
    await technologyToProjectRepository.save({
      project,
      technology,
      added_in: el.added_in,
    });
  });

  return "Technologies added with sucess!";
};

export default insertTechnologiesToProjectService;
