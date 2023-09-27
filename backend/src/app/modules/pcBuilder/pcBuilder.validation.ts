import z from "zod";

const pcBuilderSchema = z.object({
  body: z.object({
    userID: z.string({
      required_error: "User Id is Required",
    }),
    build: z.object({
      cpu: z.string({
        required_error: "CPU is Required",
      }),
      cpuCooler: z.string().optional(),
      motherboard: z.string({
        required_error: "Motherboard is Required",
      }),
      ram1: z.string({
        required_error: "RAM1 is Required",
      }),
      ram2: z.string().optional(),
      ram3: z.string().optional(),
      ram4: z.string().optional(),
      storage1: z.string({
        required_error: "Storage1 is Required",
      }),
      storage2: z.string().optional(),
      gpu: z.string().optional(),
      psu: z.string({
        required_error: "PSU is Required",
      }),
      casing: z.string({
        required_error: "Casing is Required",
      }),
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
