import { ArrayContains, DataSource, Repository } from "typeorm";
import { User } from "../../../entities/user.entity";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedInvalidUserResponse,
  mockedUserInvalidBodyRequest,
  mockedUserRequest,
  mockedUserResponse,
  mockedUserUniqueEmailResponse,
} from "../../mocks";
import { string } from "yup";
import { getRounds } from "bcryptjs";

describe("Create user route tests", () => {
  let connect: DataSource;

  const baseURL: string = "/users";
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  beforeAll(async () => {
    // Chamados antes de todos os testes
    await AppDataSource.initialize()
      .then((res) => (connect = res))
      .catch((err) => console.error(err));
  });

  //   beforeEach(() =>) Chamado antes de cada teste
  beforeEach(async () => {
    const users = await userRepo.find();
    await userRepo.remove(users);
  });

  afterAll(async () => {
    await connect.destroy();
  });
  //   afterEach(() =>{}) Chamado depois de cada teste

  it("should be able to create user", async () => {
    const response = await request(app).post(baseURL).send(mockedUserRequest);

    const expectedResults = {
      status: 201,
      bodyToEqual: mockedUserResponse,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectedResults.bodyToEqual)
    );
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
    expect(response.body).not.toEqual(
      expect.objectContaining({ password: expect.any(String) })
    );
    const [users, amount] = await userRepo.findAndCount();
    expect(amount).toBe(1);
  });

  it("should not be able to create invalid user | invalid body", async () => {
    const response = await request(app)
      .post(baseURL)
      .send(mockedUserInvalidBodyRequest);

    const expectedResult = {
      status: 400,
      bodyToEqual: mockedInvalidUserResponse,
    };

    expect(response.status).toBe(expectedResult.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.arrayContaining(expectedResult.bodyToEqual.error),
      })
    );

    const [users, amount] = await userRepo.findAndCount();
    expect(amount).toBe(0);
  });

  it("Should not be able to create user | unique user", async () => {
    const user = userRepo.create(mockedUserRequest);
    await userRepo.save(user);

    const response = await request(app).post(baseURL).send(mockedUserRequest);

    const expectedResults = {
      status: 409,
      bodyToEqual: mockedUserUniqueEmailResponse,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectedResults.bodyToEqual)
    );

    const [users, amount] = await userRepo.findAndCountBy({
      id: response.body.id,
    });
    expect(amount).toBe(1);
    expect(getRounds(users[0].password)).toBeTruthy();
  });
});
