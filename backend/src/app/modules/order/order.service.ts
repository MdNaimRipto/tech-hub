import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IOrder } from "./order.interface";
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

  const order = (await Order.create(payload)).populate([
    {
      path: "userID",
    },
    {
      path: "products.productID",
    },
  ]);
  return order;
};

export const OrderService = {
  addOrder,
};
