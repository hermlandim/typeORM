import { IUserRequest } from "../../../interfaces/users.interfaces";

const mockedUserRequest: IUserRequest = {
  name: "fabinho",
  email: "fabinho@kenzie.com.br",
  password: "12344r",
  type: "fullstack",
};

const mockedUserResponse: Omit<IUserRequest, "password"> = {
  name: "fabinho",
  email: "fabinho@kenzie.com.br",
  type: "fullstack",
};

const mockedUserInvalidBodyRequest: Omit<IUserRequest, "password" | "email"> = {
  name: "fabinho",
  type: "fullstack",
};

const mockedInvalidUserResponse = {
  error: ["password is a required field", "email is a required field"],
};

const mockedUserUniqueEmailResponse = {
  message: "Email already exists",
};

const mockedListUsers = [
  {
    name: "fabinho",
    email: "fabinho@kenzie.com.br",
    type: "fullstack",
  },
  {
    name: "felipinho",
    email: "felipinho@kenzie.com.br",
    type: "backend",
  },
  {
    name: "maykinho",
    email: "maykinho@kenzie.com.br",
    type: "fullstack",
  },
];

export {
  mockedUserRequest,
  mockedUserResponse,
  mockedUserInvalidBodyRequest,
  mockedInvalidUserResponse,
  mockedUserUniqueEmailResponse,
  mockedListUsers,
};
