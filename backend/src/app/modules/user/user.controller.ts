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

export const userController = {
  userRegister,
  userLogin,
};
