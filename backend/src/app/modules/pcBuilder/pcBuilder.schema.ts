import { Schema, model } from "mongoose";
import { IPcBuilder } from "./pcBuilder.interface";

const pcBuilderSchema = new Schema<IPcBuilder>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  build: {
    cpu: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    cpuCooler: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    motherboard: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    ram1: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
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
      required: true,
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
      required: true,
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
