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

router.get("/getAllOrders", OrderController.getAllOrders);

router.get("/getUsersOrder/:id", OrderController.getOrdersByUserID);

router.get("/getOrdersByProgress", OrderController.getOrdersByProgress);

router.patch(
  "/updateOrderStatus/:id",
  zodValidationRequest(OrderValidation.updateOrderStatus),
  OrderController.updateOrderStatus
);

export const OrderRouter = router;
