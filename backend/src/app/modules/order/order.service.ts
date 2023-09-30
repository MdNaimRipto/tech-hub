import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IOrder, OrderProgress } from "./order.interface";
import { Users } from "../user/user.schema";
import { Order } from "./order.schema";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config/config";
import { Secret } from "jsonwebtoken";

// Add Order
const addOrder = async (payload: IOrder, token: string): Promise<IOrder> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const { userID, products } = payload;

  const isUserExists = await Users.findById({ _id: userID });
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Does Not Exist's!");
  }

  if (!products.length) {
    throw new ApiError(httpStatus.FORBIDDEN, "Product Cart Cannot Be Empty!");
  }

  const order = await Order.create(payload);
  return order;
};

// Get All Orders:
const getAllOrders = async (token: string): Promise<IOrder[]> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const orders = await Order.find().populate([
    {
      path: "userID",
    },
    {
      path: "products.productID",
    },
  ]);
  if (!orders.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "0 Orders Found");
  }

  return orders;
};

// Get Order by User ID
const getOrdersByUserID = async (
  userID: string,
  token: string
): Promise<IOrder[]> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const orders = await Order.find({ userID: userID }).populate(
    "products.productID"
  );

  if (!orders.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "0 Orders Found");
  }

  return orders;
};

// Get Orders By Progress Status:
const getOrdersByProgress = async (
  progress: OrderProgress,
  token: string
): Promise<IOrder[]> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const orders = await Order.find({ progress: progress }).populate([
    {
      path: "userID",
    },
    {
      path: "products.productID",
    },
  ]);
  if (!orders.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "0 Orders Found");
  }

  return orders;
};

// Update Order Status
const updateOrderStatus = async (
  orderID: string,
  status: OrderProgress,
  token: string
): Promise<IOrder | null> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const isOrderExists = await Order.findById({ _id: orderID });
  if (!isOrderExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order Does Not Exist's!");
  }

  isOrderExists.progress = status;

  const result = await Order.findOneAndUpdate({ _id: orderID }, isOrderExists, {
    new: true,
  });

  return result;
};

export const OrderService = {
  addOrder,
  getAllOrders,
  getOrdersByUserID,
  getOrdersByProgress,
  updateOrderStatus,
};
