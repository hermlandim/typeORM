import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest, IUserResponse } from "../interfaces/users.interfaces";

const userSchema: SchemaOf<IUserRequest> = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  type: yup.string().required(),
});

const userReturnedData: SchemaOf<IUserResponse> = yup.object().shape({
  email: yup.string().email().notRequired(),
  name: yup.string().notRequired(),
  type: yup.string().notRequired(),
  id: yup.number().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
});

const userReturnedDataArray = yup.array(userReturnedData);

export { userSchema, userReturnedData, userReturnedDataArray };
