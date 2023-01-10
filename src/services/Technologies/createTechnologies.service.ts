import AppDataSource from "../../data-source";
import { Technology } from "../../entities/technology.entity";
import { ITechnologiesRequest } from "../../interfaces/technologies.interface";

const createTechnologyService = async (name: string) => {
  const technologyRepository = AppDataSource.getRepository(Technology);

  const newTechnology = technologyRepository.create({ name });

  await technologyRepository.save(newTechnology);

  return newTechnology;
};

export { createTechnologyService };
