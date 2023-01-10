import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";
import { User } from "../../entities/user.entity";

const listUserProjectService = async (userId: number): Promise<Project[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      projects: true,
    },
  });

  return user.projects;
};

export { listUserProjectService };
