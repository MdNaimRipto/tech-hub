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

router.get("/getAllUsers", userController.getAllUser);

router.post(
  "/updateUser/:id",
  zodValidationRequest(userValidation.userUpdateZodSchema),
  userController.updateUser
);

router.post("/forgotPassword/:id", userController.forgotPassword);

router.delete("/deleteUser/:id", userController.deleteUser);

export const UsersRouter = router;
