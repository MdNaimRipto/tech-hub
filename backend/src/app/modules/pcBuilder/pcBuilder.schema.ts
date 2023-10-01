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
    },
    cpuCooler: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    motherboard: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    ram1: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    ram2: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    ram3: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    ram4: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    storage1: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    storage2: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    gpu: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    psu: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    casing: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    monitor: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    casingCooler: {
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
