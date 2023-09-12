import express from "express";
import { userController } from "./user.controller";
import zodValidationRequest from "../../../middleware/zodValidationRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/userRegister",
  zodValidationRequest(userValidation.usersZodSchema),
  userController.userRegister
);

router.post(
  "/userLogin",
  zodValidationRequest(userValidation.loginUserZodSchema),
  userController.userLogin
);

export const UsersRouter = router;
