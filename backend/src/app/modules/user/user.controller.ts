import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { encryptData } from "./user.utils";
import { IAuthenticatedUser } from "./user.interface";
import pick from "../../../shared/shared";
import { userFilterableFields } from "./user.constant";
import { paginationFields } from "../../../constants/pagination.constant";

// User Registration
const userRegister = catchAsync(async (req: Request, res: Response) => {
  const { ...userInfo } = req.body;

  const user = await UserService.userRegister(userInfo);

  const userData = encryptData(user as IAuthenticatedUser);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Registration Successful",
    data: userData,
  });
});

// User Login
const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginInfo } = req.body;

  const user = await UserService.userLogin(loginInfo);

  const userData = encryptData(user as IAuthenticatedUser);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login Successful",
    data: userData,
  });
});

// Get all User's
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, paginationFields);
  const user = await UserService.getAllUser(filters, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User's Retrieved",
    data: user,
  });
});

// Update User
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...payload } = req.body;
  const user = await UserService.updateUser(id, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Updated Successfully",
    data: user,
  });
});

// Forgot Password
const findUserForForgotPassword = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.query;
    const user = await UserService.findUserForForgotPassword(email as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Email Verified! Please Update Password.",
      data: user,
    });
  }
);

// Forgot Password
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  await UserService.forgotPassword(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Password Updated Successfully",
    data: null,
  });
});

// Delete User
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.deleteUser(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Account Deleted Successfully",
    data: user,
  });
});
export const userController = {
  userRegister,
  userLogin,
  getAllUser,
  updateUser,
  findUserForForgotPassword,
  forgotPassword,
  deleteUser,
};
