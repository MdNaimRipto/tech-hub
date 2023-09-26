import { OrderProgress } from "./order.interface";

export const OrderProgressSteps: OrderProgress[] = [
  "Pending",
  "Processing",
  "Verifying",
  "Confirmed",
  "Delivered",
  "Completed",
  "Canceled",
];
