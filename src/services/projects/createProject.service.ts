import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";
import { User } from "../../entities/user.entity";
import { IProjectRequest } from "../../interfaces/projects.interfaces";

const createProjectService = async (
  projectData: IProjectRequest,
  userId: number
): Promise<Project> => {
  const userRepository = AppDataSource.getRepository(User);
  const projectRepository = AppDataSource.getRepository(Project);

  const user = await userRepository.findOneBy({ id: userId });

  const newProject = projectRepository.create({
    ...projectData,
    user,
  });

  await projectRepository.save(newProject);

  return newProject;
};

export default createProjectService;
