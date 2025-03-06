import React, { Suspense } from "react";
import TodoForm from "@/features/todo/components/TodoForm";
import TodoStream from "@/features/todo/components/TodoStream";
import { DatePickerWithContext, DateProvider } from "@/context/DateProvider";
import { getCurrentUser } from "@/features/authentication/utils/getCurrentUser";
import { redirect } from "next/navigation";

async function TodoPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; page?: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const params = await searchParams;
  const date = params.date ? new Date(params.date) : new Date();
  const page = params.page ? parseInt(params.page, 10) : 1;

  return (
    <DateProvider>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            Todo List
          </h1>
          <TodoForm key={`${date.toString()}`} />
          <DatePickerWithContext />
        </div>

        <Suspense
          key={`${date.toString()}-${page}`}
          fallback={
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          }
        >
          <TodoStream userId={user.userId} date={date} page={page} />
        </Suspense>
      </div>
    </DateProvider>
  );
}

export default TodoPage;
