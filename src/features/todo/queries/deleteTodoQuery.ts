"use server";
import Todo from "@/database/models/Todo";

export async function deleteTodoQuery(userId: string, todoId: string) {
  try {
    const todo = await Todo.findOneAndDelete({ _id: todoId, user: userId });

    if (!todo) {
      return { success: false, error: "Todo not found" };
    }

    return { success: true, data: todo };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to delete todo" };
  }
}
