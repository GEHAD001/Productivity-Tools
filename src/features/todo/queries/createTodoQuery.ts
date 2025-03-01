"use server";
import Todo from "@/database/models/Todo";
import { TodoFormFields } from "../schemas/TodoFormFields";
import connectToDB from "@/database/connection";

export interface CreateTodoParams extends TodoFormFields {
  userId: string;
}

export async function createTodoQuery({
  task,
  date,
  userId,
}: CreateTodoParams) {
  await connectToDB();
  try {
    const todo = await Todo.create({
      task,
      date,
      user: userId,
      state: "pending",
    });

    return { success: true, data: todo };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create todo" };
  }
}
