import express from "express";
import { OrderController } from "./order.controller";
import zodValidationRequest from "../../../middleware/zodValidationRequest";
import { OrderValidation } from "./order.validation";

const router = express.Router();

router.post(
  "/orderProducts",
  zodValidationRequest(OrderValidation.orderZodSchema),
  OrderController.addOrder
);

export const OrderRouter = router;
