import { DataSource, Repository } from "typeorm";
import { User } from "../../../entities/user.entity";
import AppDataSource from "../../../data-source";
import { sign } from "jsonwebtoken";
import request from "supertest";
import app from "../../../app";
import { mockedListUsers } from "../../mocks";

describe("Create user route tests", () => {
  let connect: DataSource;

  const baseURL: string = "/users";

  beforeAll(async () => {
    // Chamados antes de todos os testes
    await AppDataSource.initialize()
      .then(async (res) => {
        connect = res;
        const userRepo = res.getRepository(User);
        for await (const user of mockedListUsers) {
          const mockedUser = userRepo.create({
            ...user,
            password: "maisQueSenior",
          });
          await userRepo.save(mockedUser);
        }
      })
      .catch((err) => console.error(err));
  });

  //   beforeEach(() =>) Chamado antes de cada teste
  //   beforeEach(async () => {
  //     const users = await userRepo.find();
  //     await userRepo.remove(users);
  //   });

  afterAll(async () => {
    await connect.destroy();
  });
  //   afterEach(() =>{}) Chamado depois de cada teste

  it("should be able to list user", async () => {
    const token = sign({ type: "frontend" }, process.env.SECRET_KEY, {
      subject: "1",
    });

    const response = await request(app)
      .get(baseURL)
      .set("Authorization", `Bearer ${token}`)
      .send();

    const expectedResponse = {
      status: 200,
      bodyToEqual: mockedListUsers,
      bodyToHaveLength: mockedListUsers.length,
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toHaveLength(expectedResponse.bodyToHaveLength);
    expect(response.body).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ password: expect.any(String) }),
      ])
    );
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: expect.any(Number) }),
      ])
    );
  });

  it("should not be able to list user | invalid token", async () => {
    const response = await request(app).get(baseURL).send();

    const expectedResponse = {
      status: 401,
      bodyToEqual: { message: "Invalid token" },
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toStrictEqual(expectedResponse.bodyToEqual);
  });
});
