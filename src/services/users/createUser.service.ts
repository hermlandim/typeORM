import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserRequest, IUserResponse } from "../../interfaces/users.interfaces";
import { userReturnedData } from "../../schemas/user.schema";

const createUserService = async (
  userData: IUserRequest
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const userAlreadyExists = await userRepository.exist({
    where: {
      email: userData.email,
    },
  });

  if (userAlreadyExists) {
    throw new AppError("Email already exists", 409);
  }

  const user = userRepository.create(userData);
  await userRepository.save(user);

  const returnedData = await userReturnedData.validate(user, {
    stripUnknown: true,
  });

  return returnedData;
};

export default createUserService;
