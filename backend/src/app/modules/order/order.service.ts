import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IOrder, OrderProgress, OrderedProducts } from "./order.interface";
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
import { IProduct } from "../products/products.interface";
import { Products } from "../products/products.schema";

//* Add Order
const addOrder = async (payload: IOrder, token: string): Promise<IOrder> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const { userID, products } = payload;

  const isUserExists = await Users.findById(
    { _id: userID },
    {
      _id: 1,
      uid: 1,
    }
  ).lean();
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Does Not Exist's!");
  }

  if (isUserExists.uid === config.admin_uid) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Admin Can't Order Products!");
  }

  if (!products.length) {
    throw new ApiError(httpStatus.FORBIDDEN, "Product Cart Cannot Be Empty!");
  }

  for (const orderProduct of products as OrderedProducts[]) {
    const productId = orderProduct.productID;
    const product = (await Products.findOne({ _id: productId })) as IProduct;
    if (product.quantity <= 0 || product.status === false) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Product is Out Of Stock!");
    }

    if (product.quantity < orderProduct.quantity) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Not Enough Product in Stock!"
      );
    }
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

  const order = (await Order.create(payload)).populate({
    path: "products.productID",
    select: "-_id quantity totalSale status",
  });
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

  const total = await Order.countDocuments();

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

  const orders = await Order.find({ progress: progress })
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
    .sort({ createdAt: -1 });

  return orders;
};

//* Update Order Status
const updateOrderStatus = async (
  orderID: string,
  status: OrderProgress,
  token: string
): Promise<IOrder | null> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const isOrderExists = await Order.findById(
    { _id: orderID },
    {
      progress: 1,
      products: 1,
    }
  )
    .populate({
      path: "products.productID",
      select: "quantity totalSale status",
    })
    .lean();

  if (!isOrderExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order Does Not Exist's!");
  }

  if (isOrderExists.progress === "Completed") {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Cannot Update! Order Has Been Completed."
    );
  }

  if (isOrderExists.progress === "Canceled") {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Cannot Update! Order Has Been Canceled."
    );
  }

  isOrderExists.progress = status;

  if (isOrderExists?.progress === "Completed") {
    for (const orderProduct of isOrderExists?.products as OrderedProducts[]) {
      const productId = orderProduct.productID;
      const product = (await Products.findOne({ _id: productId })) as IProduct;
      if (product.quantity <= 0 || product.status === false) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Cannot Update Product Which is Out Of Stock!"
        );
      }

      product.quantity = product.quantity - orderProduct.quantity;
      product.totalSale += 1;
      if (product.quantity === 0) {
        product.status = false;
      }
      await Products.findOneAndUpdate({ code: product.code }, product, {
        new: true,
      });
    }
  }

  const result = await Order.findOneAndUpdate({ _id: orderID }, isOrderExists, {
    new: true,
  });

  return result;
};

export const OrderService = {
  addOrder,
  getAllOrders,
  getOrdersByUserID,
  getOrdersByOrderID,
  getOrdersByProgress,
  updateOrderStatus,
};
