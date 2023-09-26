import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";

// Add Order
const addOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...orderPayload } = req.body;

  await OrderService.addOrder(orderPayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Products Ordered.",
    data: null,
  });
});

// Get All Orders
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await OrderService.getAllOrders();

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
  const orders = await OrderService.getOrdersByUserID(id);

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
  const orders = await OrderService.getOrdersByProgress(progress);

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
  const order = await OrderService.updateOrderStatus(id, status);

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
