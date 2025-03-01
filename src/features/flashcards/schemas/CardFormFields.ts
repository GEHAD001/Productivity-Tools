import { z } from "zod";

export const cardFormValidator = z.object({
  front: z.string().min(1, "Front content is required"),
  back: z.string().min(1, "Back content is required"),
  visibility: z.enum(["public", "private"]).default("private")
});

export type CardFormFields = z.infer<typeof cardFormValidator>;