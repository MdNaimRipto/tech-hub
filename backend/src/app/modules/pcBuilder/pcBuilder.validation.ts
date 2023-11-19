import z from "zod";

const pcBuilderSchema = z.object({
  body: z.object({
    userID: z.string({
      required_error: "User Id is Required",
    }),
    buildName: z.string({
      required_error: "Build Name is Required",
    }),
    build: z.object({
      cpu: z.string({
        required_error: "CPU Is Required",
      }),
      cooler: z.string().optional(),
      motherboard: z.string({
        required_error: "Motherboard Is Required",
      }),
      ram: z.string({
        required_error: "RAM Is Required",
      }),
      storage: z.string({
        required_error: "Storage Is Required",
      }),
      psu: z.string({
        required_error: "PSU Is Required",
      }),
      gpu: z.string().optional(),
      casing: z.string({
        required_error: "Casing Is Required",
      }),
      monitor: z.string().optional(),
      keyboard: z.string().optional(),
      mouse: z.string().optional(),
      speaker: z.string().optional(),
      headphone: z.string().optional(),
    }),
  }),
});

export const PcBuilderValidation = {
  pcBuilderSchema,
};
