import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config/config";

export const usersSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    password: { type: String, required: true },
    userProfile: {
      type: String,
      required: true,
      default: "https://i.ibb.co/dcHVrp8/User-Profile-PNG-Image.png",
    },
    street: { type: String, required: true, default: "empty" },
    city: { type: String, required: true, default: "empty" },
    district: { type: String, required: true, default: "empty" },
    userRole: { type: String, required: true, default: "seller" },
    uid: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

usersSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_round));
  next();
});

export const Users = model<IUser>("Users", usersSchema);
