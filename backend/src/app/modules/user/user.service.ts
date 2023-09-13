import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ILoginUser, IUser } from "./user.interface";
import { Users } from "./user.schema";
import bcrypt from "bcrypt";
import { generateUID } from "./user.utils";

const userRegister = async (payload: IUser): Promise<IUser> => {
  const { email, contactNumber } = payload;
  // Check if the email or contact already exists
  const existingUser = await Users.findOne({
    $or: [{ email }, { contactNumber }],
  });
  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, "Email or Contact Already Exists");
  }

  const id = generateUID();

  payload.uid = id;

  const user = new Users(payload);

  const result = user.save();

  return result;
};

const userLogin = async (payload: ILoginUser): Promise<IUser> => {
  const { email, password } = payload;
  const isExists = await Users.findOne({ email: email });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Email Or Password");
  }

  const checkPassword = await bcrypt.compare(password, isExists.password);

  if (!checkPassword) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Email Or Password");
  }

  return isExists;
};

export const UserService = {
  userRegister,
  userLogin,
};
