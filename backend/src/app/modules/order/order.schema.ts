import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";
import { OrderProgressSteps } from "./order.constant";

export const orderSchema = new Schema<IOrder>(
  {
    userID: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    products: [
      {
        productID: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Products",
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: { type: Number, required: true, min: 1 },
    progress: { type: String, enum: OrderProgressSteps, default: "Pending" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Order = model<IOrder>("Order", orderSchema);
