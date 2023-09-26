import { z } from "zod";
import { OrderProgressSteps } from "./order.constant";

const productSchema = z.object({
  productID: z.string({
    required_error: "Product ID is Required",
  }),
  quantity: z.number({
    required_error: "Quantity is required",
  }),
});

const orderZodSchema = z.object({
  body: z.object({
    userID: z.string({
      required_error: "User ID is Required",
    }),
    products: z.array(productSchema),
    totalPrice: z.number({
      required_error: "Total Price is Required",
    }),
    progress: z
      .enum([...OrderProgressSteps] as [string, ...string[]], {
        required_error: "Progress is required",
      })
      .default("Pending"),
  }),
});

const updateOrderStatus = z.object({
  body: z.object({
    status: z.enum([...OrderProgressSteps] as [string, ...string[]], {
      required_error:
        "Progress must be one of `Pending`, `Processing`, `Verifying`, `Confirmed`, `Delivered`, `Completed`, or `Canceled`",
    }),
  }),
});

export const OrderValidation = {
  orderZodSchema,
  updateOrderStatus,
};
