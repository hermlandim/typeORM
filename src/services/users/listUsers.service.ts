import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users.interfaces";
import { userReturnedDataArray } from "../../schemas/user.schema";

const listUsersService = async (): Promise<IUserResponse[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find({
    relations: {
      adress: true,
      projects: true,
    },
  });
  const returnedData = userReturnedDataArray.validate(users, {
    stripUnknown: true,
  });

  return returnedData;
};

export default listUsersService;
