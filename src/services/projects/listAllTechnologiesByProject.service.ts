import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";

const listAllTechnologiesByProjectService = async (projectId: number) => {
  const projectRepository = AppDataSource.getRepository(Project);

  const projects = await projectRepository
    .createQueryBuilder("projects")
    .innerJoinAndSelect(
      "projects.technologiesToProject",
      "technologiesToProject"
    )
    .innerJoinAndSelect("technologiesToProject.technology", "technologies")
    .where("projects.id = :id_project", { id_project: projectId })
    .getOne();
  // .select(["projects.id as id_projeto", "technologies.name as name_tech"])
  // .getRawOne();

  return projects;
};

export { listAllTechnologiesByProjectService };
