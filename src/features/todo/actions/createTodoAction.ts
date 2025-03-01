"use server";

import User from "@/database/models/User";
import { createTodoQuery } from "../queries/createTodoQuery";
import { TodoFormFields } from "../schemas/TodoFormFields";
import { revalidatePath } from "next/cache";

export async function createTodoAction(data: TodoFormFields) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    // TODO: Get actual user ID from session
    const userId = (await User.find()).at(0)._id;

    const result = await createTodoQuery({
      ...data,
      userId,
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
