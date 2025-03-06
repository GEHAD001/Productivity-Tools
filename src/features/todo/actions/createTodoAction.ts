"use server";

import { createTodoQuery } from "../queries/createTodoQuery";
import { TodoFormFields } from "../schemas/TodoFormFields";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/features/authentication/utils/getCurrentUser";

export async function createTodoAction(data: TodoFormFields) {
  try {
    const user = await getCurrentUser();
    const result = await createTodoQuery({
      ...data,
      userId: user!.userId,
    });

    if (!result.success) {
      return { error: true, message: result.error ?? "error" };
    }

    revalidatePath("/");

    return {
      error: false,
      message: "Todo created successfully",
      data: JSON.stringify(result.data),
    };
  } catch (error) {
    console.log(error);
    return { error: true, message: "Failed to create todo" };
  }
}
