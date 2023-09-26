import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";

// Add Wishlist
const addOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...orderPayload } = req.body;

  const order = await OrderService.addOrder(orderPayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Products Ordered.",
    data: order,
  });
});

export const OrderController = {
  addOrder,
};
