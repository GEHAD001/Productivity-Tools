"use server";

import { revalidatePath } from "next/cache";
import { updateTodoQuery } from "../queries/updateTodoQuery";

export interface UpdateTodoActionParams {
  todoId: string;
  task?: string;
  state?: "pending" | "success" | "failed";
  date?: Date;
}

export async function updateTodoAction({
  todoId,
  ...updateData
}: UpdateTodoActionParams) {
  await new Promise((resolve) => setTimeout(resolve, 750));
  try {
    const result = await updateTodoQuery({ todoId, ...updateData });

    if (!result.success) {
      return { error: true, message: result.error };
    }

    revalidatePath("/");

    return {
      error: false,
      message: "todo has been updated",
      data: JSON.stringify(result.data),
    };
  } catch (error) {
    console.log(error);
    return { error: true, message: "Failed to update todo" };
  }
}
