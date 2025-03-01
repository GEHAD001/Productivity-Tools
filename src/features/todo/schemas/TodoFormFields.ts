import { z } from "zod";

export const todoFormValidator = z.object({
  task: z.string().min(1, "Task is required"),
  date: z.date({
    required_error: "Please select a date",
    invalid_type_error: "That's not a date!",
  }),
});

export type TodoFormFields = z.infer<typeof todoFormValidator>;