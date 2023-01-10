import AppDataSource from "../../data-source";
import { Technology } from "../../entities/technology.entity";

const listTechnologyService = async () => {
  const userRepository = AppDataSource.getRepository(Technology);

  const findTechnologies = userRepository.find();

  return findTechnologies;
};

export default listTechnologyService;
