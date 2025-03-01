"use server";
import Todo from "@/database/models/Todo";

export interface UpdateTodoParams {
  todoId: string;
  task?: string;
  state?: "pending" | "success" | "failed";
  date?: Date;
}

export async function updateTodoQuery({ todoId, ...updateData }: UpdateTodoParams) {
  try {
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      updateData,
      { new: true }
    );

    if (!todo) {
      return { success: false, error: "Todo not found" };
    }

    return { success: true, data: todo };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to update todo" };
  }
}