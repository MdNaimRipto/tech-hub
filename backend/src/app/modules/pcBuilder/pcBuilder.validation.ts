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
      cpu: z.string().optional(),
      cpuCooler: z.string().optional(),
      motherboard: z.string().optional(),
      ram1: z.string().optional(),
      ram2: z.string().optional(),
      ram3: z.string().optional(),
      ram4: z.string().optional(),
      storage1: z.string().optional(),
      storage2: z.string().optional(),
      gpu: z.string().optional(),
      psu: z.string().optional(),
      casing: z.string().optional(),
      monitor: z.string().optional(),
      casingCooler: z.string().optional(),
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
