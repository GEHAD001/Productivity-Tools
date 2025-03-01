"use server";

import { deleteTodoQuery } from "../queries/deleteTodoQuery";
import { revalidatePath } from "next/cache";

export async function deleteTodoAction(todoId: string): Promise<{
  error: boolean;
  message: string;
  data?: object | string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const result = await deleteTodoQuery(todoId);

    if (!result.success) {
      return { error: true, message: result.error ?? "error in db" };
    }

    revalidatePath("/");

    return {
      error: false,
      message: "todo has been deleted",
      data: JSON.stringify(result.data),
    };
  } catch (error) {
    console.log(error);
    return { error: true, message: "Failed to delete todo" };
  }
}
