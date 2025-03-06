"use server";

import { getCurrentUser } from "@/features/authentication/utils/getCurrentUser";
import { deleteTodoQuery } from "../queries/deleteTodoQuery";
import { revalidatePath } from "next/cache";

export async function deleteTodoAction(todoId: string): Promise<{
  error: boolean;
  message: string;
  data?: object | string;
}> {
  const user = await getCurrentUser();
  try {
    const result = await deleteTodoQuery(user!.userId, todoId);

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
