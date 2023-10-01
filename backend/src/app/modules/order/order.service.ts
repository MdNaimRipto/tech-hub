import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IOrder, OrderProgress } from "./order.interface";
import { Users } from "../user/user.schema";
import { Order } from "./order.schema";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config/config";
import { Secret } from "jsonwebtoken";
import {
  IGenericPaginationResponse,
  IPaginationOptions,
} from "../../../interface/pagination";
import { calculatePaginationFunction } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { generateOrderCode } from "./order.utils";

//* Add Order
const addOrder = async (payload: IOrder, token: string): Promise<IOrder> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const { userID, products } = payload;

  const isUserExists = await Users.findById(
    { _id: userID },
    {
      _id: 1,
    }
  ).lean();
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Does Not Exist's!");
  }

  if (!products.length) {
    throw new ApiError(httpStatus.FORBIDDEN, "Product Cart Cannot Be Empty!");
  }

  const code = generateOrderCode();

  const isCodeExists = await Order.findOne(
    { code: code },
    {
      code: 1,
    }
  );

  if (isCodeExists) {
    throw new ApiError(httpStatus.CONFLICT, "Failed To Order! Try Again");
  }

  payload.code = code;

  const order = await Order.create(payload);
  return order;
};

//* Get All Orders:
const getAllOrders = async (
  paginationOptions: IPaginationOptions,
  token: string
): Promise<IGenericPaginationResponse<IOrder[]>> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const orders = await Order.find()
    .populate([
      {
        path: "userID",
        select: "-_id name email userProfile",
      },
      {
        path: "products.productID",
        select: "_id images.i1 name code",
      },
    ])
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  if (!orders.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "0 Orders Found");
  }

  const total = Order.length;

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: orders,
  };
};

//* Get Order by User ID
const getOrdersByUserID = async (
  paginationOptions: IPaginationOptions,
  userID: string,
  token: string
): Promise<IGenericPaginationResponse<IOrder[]>> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const orders = await Order.find(
    { userID: userID },
    {
      _id: 1,
      code: 1,
      createdAt: 1,
      totalPrice: 1,
      progress: 1,
    }
  )
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  if (!orders.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "0 Orders Found");
  }

  const total = Order.length;

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: orders,
  };
};

// * Get OrderDetails
const getOrdersByOrderID = async (
  id: string,
  token: string
): Promise<IOrder | null> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const order = await Order.findById({ _id: id }).populate({
    path: "products.productID",
    select: "_id name images.i1 price",
  });

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order Details Not Found!");
  }

  return order;
};

//* Get Orders By Progress Status:
const getOrdersByProgress = async (
  progress: OrderProgress,
  token: string
): Promise<IOrder[]> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const orders = await Order.find({ progress: progress }).populate([
    {
      path: "userID",
      select: "-_id name email userProfile",
    },
    {
      path: "products.productID",
      select: "_id images.i1 name code",
    },
  ]);
  if (!orders.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "0 Orders Found");
  }

  return orders;
};

//* Update Order Status
const updateOrderStatus = async (
  orderID: string,
  status: OrderProgress,
  token: string
): Promise<null> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const isOrderExists = await Order.findById(
    { _id: orderID },
    {
      progress: 1,
    }
  ).lean();
  if (!isOrderExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order Does Not Exist's!");
  }

  isOrderExists.progress = status;

  await Order.findOneAndUpdate({ _id: orderID }, isOrderExists, {
    new: true,
  });

  return null;
};

export const OrderService = {
  addOrder,
  getAllOrders,
  getOrdersByUserID,
  getOrdersByOrderID,
  getOrdersByProgress,
  updateOrderStatus,
};
