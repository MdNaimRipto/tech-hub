import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

// User Registration
const userRegister = catchAsync(async (req: Request, res: Response) => {
  const { ...userInfo } = req.body;

  const user = await UserService.userRegister(userInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Registration Successful",
    data: user,
  });
});

// User Login
const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginInfo } = req.body;

  const user = await UserService.userLogin(loginInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login Successful",
    data: user,
  });
});

// Get all User's
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.getAllUser();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All User's",
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
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...payload } = req.body;
  const user = await UserService.forgotPassword(id, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Password Updated Successfully",
    data: user,
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
  forgotPassword,
  deleteUser,
};
