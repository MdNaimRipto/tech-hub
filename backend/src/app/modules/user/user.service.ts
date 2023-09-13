import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ILoginUser, IUser } from "./user.interface";
import { Users } from "./user.schema";
import bcrypt from "bcrypt";
import { generateUID } from "./user.utils";
import config from "../../../config/config";

// User Register
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

// User Login
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

const getAllUser = async (): Promise<IUser[]> => {
  const users = await Users.find();
  if (users.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Users Found to Show!");
  }
  return users;
};

// User Update
const updateUser = async (
  userID: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExistsUser = await Users.findById({ _id: userID });
  if (!isExistsUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }

  const { userRole, uid, ...updatePayload } = payload;

  if (userRole !== undefined || uid !== undefined) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Permission Denied! Please Try Again."
    );
  }

  if (payload.email) {
    const isExists = await Users.findOne({ email: payload.email });
    if (isExists) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Email Already Exists! Try Another One."
      );
    }
    updatePayload.email = payload.email;
  }

  if (payload.password) {
    const isPreviousPass = await bcrypt.compare(
      payload.password,
      isExistsUser.password as string
    );

    if (isPreviousPass) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "New Password Cannot be The Previous Password"
      );
    }
    const newPassword = await bcrypt.hash(
      payload.password,
      Number(config.salt_round)
    );
    updatePayload.password = newPassword;
  }

  const result = await Users.findOneAndUpdate({ _id: userID }, updatePayload, {
    new: true,
  });

  return result;
};

// Forgot Password
const forgotPassword = async (
  userID: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExistsUser = await Users.findById({ _id: userID });
  if (!isExistsUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }

  if (!payload.password) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Password Update Failed!. Try Again."
    );
  }

  const isPreviousPass = await bcrypt.compare(
    payload.password,
    isExistsUser.password as string
  );

  if (isPreviousPass) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "New Password Cannot be The Previous Password"
    );
  }
  const newPass = await bcrypt.hash(
    payload.password,
    Number(config.salt_round)
  );
  payload.password = newPass;

  const result = await Users.findOneAndUpdate({ _id: userID }, payload, {
    new: true,
  });

  return result;
};

// Delete User
const deleteUser = async (userID: string): Promise<IUser | null> => {
  const isExists = await Users.findById({ _id: userID });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }

  const deleteUser = await Users.findOneAndDelete(
    { _id: userID },
    {
      new: true,
    }
  );

  return deleteUser;
};

export const UserService = {
  userRegister,
  userLogin,
  getAllUser,
  updateUser,
  forgotPassword,
  deleteUser,
};
