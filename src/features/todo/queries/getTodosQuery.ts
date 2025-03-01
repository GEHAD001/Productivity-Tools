"use server";

import connectToDB from "@/database/connection";
import Todo from "@/database/models/Todo";

export interface GetTodosResponse {
  success: boolean;
  data?: any;
  error?: string;
  totalPages?: number;
  currentPage?: number;
}

export async function getAllTodosQuery(): Promise<GetTodosResponse> {
  await connectToDB();
  try {
    const todos = await Todo.find().sort({ date: -1 });

    return { success: true, data: todos };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to fetch todos" };
  }
}

export async function getTodosByDateQuery(
  date: Date,
  page: number = 1,
  limit: number = 5
): Promise<GetTodosResponse> {
  // await new Promise((resolve) => setTimeout(resolve, 2500));
  await connectToDB();
  try {
    // Create start and end of the day for date filtering
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const query = {
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    };

    const totalTodos = await Todo.countDocuments(query);
    const totalPages = Math.ceil(totalTodos / limit);
    const skip = (page - 1) * limit;

    const todos = await Todo.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    return {
      success: true,
      data: todos,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Failed to fetch todos for the specified date",
    };
  }
}
