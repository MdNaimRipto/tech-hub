import { z } from "zod";

const usersZodSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "First Name Required",
    }),
    lastName: z.string({
      required_error: "Last Name Required",
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

export const userValidation = {
  usersZodSchema,
  loginUserZodSchema,
};
