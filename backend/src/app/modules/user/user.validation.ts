import { z } from "zod";

const usersZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "User Name is Required",
    }),
    email: z.string({
      required_error: "Email is Required",
    }),
    contactNumber: z.string({
      required_error: "Contact Number is Required",
    }),
    password: z.string({
      required_error: "Password is Required",
    }),
    userProfile: z
      .string()
      .default("https://i.ibb.co/dcHVrp8/User-Profile-PNG-Image.png"),
    street: z.string().default("empty"),
    city: z.string().default("empty"),
    district: z.string().default("empty"),
    userRole: z.string().default("seller"),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is Required",
    }),
    password: z.string({
      required_error: "Password is Required",
    }),
  }),
});

const userUpdateZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    contactNumber: z.string().optional(),
    password: z.string().optional(),
    userProfile: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    userRole: z.string().optional(),
    uid: z.string().optional(),
  }),
});

export const userValidation = {
  usersZodSchema,
  loginUserZodSchema,
  userUpdateZodSchema,
};
