import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IOrder, OrderProgress } from "./order.interface";
import { Users } from "../user/user.schema";
import { Order } from "./order.schema";

// Add Order
const addOrder = async (payload: IOrder): Promise<IOrder> => {
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
const getAllOrders = async (): Promise<IOrder[]> => {
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

const getOrdersByUserID = async (userID: string): Promise<IOrder[]> => {
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
  progress: OrderProgress
): Promise<IOrder[]> => {
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
  status: OrderProgress
): Promise<IOrder | null> => {
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
