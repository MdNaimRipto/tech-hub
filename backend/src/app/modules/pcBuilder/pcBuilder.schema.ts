import { Schema, model } from "mongoose";
import { IPcBuilder } from "./pcBuilder.interface";

const pcBuilderSchema = new Schema<IPcBuilder>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  buildName: { type: String, required: true },
  code: { type: String, required: true },
  build: {
    cpu: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    cooler: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    motherboard: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    ram: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    storage: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    psu: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    gpu: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    casing: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    monitor: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    keyboard: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    mouse: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    speaker: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    headphone: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
  },
});

export const PcBuilder = model<IPcBuilder>("PcBuilder", pcBuilderSchema);
