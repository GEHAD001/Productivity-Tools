import { z } from "zod";

export const flashcardFormValidator = z.object({
  name: z.string().min(1, "Flashcard name is required"),
  visibility: z.enum(["public", "private"]).default("private")
});

export type FlashcardFormFields = z.infer<typeof flashcardFormValidator>;