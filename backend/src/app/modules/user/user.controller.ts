import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/shared";
import { userFilterableFields } from "./user.constant";
import { paginationFields } from "../../../constants/pagination.constant";
import { verifyAuthToken } from "../../../util/verifyAuthToken";

// User Registration
const userRegister = catchAsync(async (req: Request, res: Response) => {
  const { ...userInfo } = req.body;

  const result = await UserService.userRegister(userInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Registration Successful",
    data: result?.accessToken,
  });
});

// User Login
const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginInfo } = req.body;

  const result = await UserService.userLogin(loginInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login Successful",
    data: result?.accessToken,
  });
});

// User Login
const getAuthenticatedUser = catchAsync(async (req: Request, res: Response) => {
  const token = verifyAuthToken(req);

  const result = await UserService.getAuthenticatedUser(token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login Successful",
    data: result,
  });
});

// Get all User's
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, paginationFields);
  const token = verifyAuthToken(req);

  const user = await UserService.getAllUser(filters, options, token);
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
  const token = verifyAuthToken(req);

  const user = await UserService.updateUser(id, payload, token);
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
  const token = verifyAuthToken(req);

  await UserService.deleteUser(id, token);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Account Deleted Successfully",
    data: null,
  });
});

export const userController = {
  userRegister,
  userLogin,
  getAuthenticatedUser,
  getAllUser,
  updateUser,
  findUserForForgotPassword,
  forgotPassword,
  deleteUser,
};
