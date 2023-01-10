import { DataSource } from "typeorm";
import createUserService from "../../../services/users/createUser.service";
import AppDataSource from "../../../data-source";
import {
  IUserRequest,
  IUserResponse,
} from "../../../interfaces/users.interfaces";

describe("Tests for createUser service", () => {
  let conn: DataSource;

  beforeAll(async () => {
    // beforeAll = chamado antes de todos os testes.
    await AppDataSource.initialize()
      .then((res) => (conn = res))
      .catch((err) => console.error(err));
  });

  // beforeEach(() => {}) // beforeEach = chamado antes de cada testes.

  afterAll(async () => {
    // afterAll = chamado depois de todos os testes.
    await conn.destroy();
  });

  // afterEach(() => {}) // afterEach = chamado depois de cada testes.

  it("Should be able to create a user", async () => {
    const userData: IUserRequest = {
      name: "Fabião",
      email: "fabião@mail.com",
      type: "fullstack",
      password: "agoraSenior",
    };

    const result: IUserResponse = await createUserService(userData);

    expect(result).toHaveProperty("id");
    expect(result).not.toContain("password");
  });

  it("Should throw UNIQUE error", async () => {
    const userData: IUserRequest = {
      name: "Pablão",
      email: "pablão@mail.com",
      type: "fullstack",
      password: "pablãoDaMassa!",
    };

    await createUserService(userData);

    try {
      await createUserService(userData);
    } catch (error) {
      expect(error.statusCode).toBe(409);
      expect(error.message).toBe("Email already exists");
    }
  });
});
