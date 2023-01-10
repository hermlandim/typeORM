import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const listUserByIdService = async (userId: number) => {
  const user = await AppDataSource.createQueryBuilder()
    .select(["users.id", "users.name", "users.email", "users.type"])
    .from(User, "users")
    .where("users.id = :id", { id: userId })
    .getOne();

  return user;
};

export default listUserByIdService;
