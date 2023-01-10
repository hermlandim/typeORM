import AppDataSource from "../../data-source";
import { Technology } from "../../entities/technology.entity";

const listAllProjectsByTechnologieService = async (techId: number) => {
  const technologiesRepository = AppDataSource.getRepository(Technology);

  const projects = await technologiesRepository
    .createQueryBuilder("technologies")
    .innerJoinAndSelect(
      "technologies.technologyToProject",
      "technologyToProject"
    )
    .innerJoinAndSelect("technologyToProject.project", "projects")
    .where("technologies.id = :id_tech", { id_tech: techId })
    .getMany();

  return projects;
};

export { listAllProjectsByTechnologieService };
