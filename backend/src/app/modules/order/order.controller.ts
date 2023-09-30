import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";
import { verifyAuthToken } from "../../../util/verifyAuthToken";

// Add Order
const addOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...orderPayload } = req.body;
  const token = verifyAuthToken(req);

  await OrderService.addOrder(orderPayload, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Products Ordered.",
    data: null,
  });
});

// Get All Orders
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const token = verifyAuthToken(req);

  const orders = await OrderService.getAllOrders(token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders Retrieved.",
    data: orders,
  });
});

// Get All Orders
const getOrdersByUserID = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = verifyAuthToken(req);

  const orders = await OrderService.getOrdersByUserID(id, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders Retrieved.",
    data: orders,
  });
});

// Get Orders By Progress Status
const getOrdersByProgress = catchAsync(async (req: Request, res: Response) => {
  const { progress } = req.body;
  const token = verifyAuthToken(req);

  const orders = await OrderService.getOrdersByProgress(progress, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders Retrieved.",
    data: orders,
  });
});

// Update Order Status
const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const token = verifyAuthToken(req);

  const order = await OrderService.updateOrderStatus(id, status, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order Updated.",
    data: order,
  });
});

export const OrderController = {
  addOrder,
  getAllOrders,
  getOrdersByUserID,
  getOrdersByProgress,
  updateOrderStatus,
};
