"use client";

import { ActionButton } from "@/components/ActionButton";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TodoType } from "@/database/models/Todo";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { FocusEvent, useTransition } from "react";
import { deleteTodoAction } from "../actions/deleteTodoAction";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateTodoAction } from "../actions/updateTodoAction";

interface Todo extends TodoType {
  _id: string;
}

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead>Task</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo._id} />
        ))}
      </TableBody>
    </Table>
  );
}

function TodoItem({ todo }: { todo: Todo }) {
  const [isUpdating, startTransition] = useTransition();

  function handleTaskUpdate({
    e,
    todoId,
  }: {
    e: FocusEvent<HTMLInputElement, Element>;
    todoId: string;
  }) {
    startTransition(async () => {
      const { error, message } = await updateTodoAction({
        todoId,
        task: e.target.value,
      });

      if (!error) {
        toast.success(message);
        return;
      }

      toast.error(message);
    });
  }

  function handleTaskStateUpdate({ todoId }: { todoId: string }) {
    startTransition(async () => {
      const { error, message } = await updateTodoAction({
        todoId,
        state: todo.state === "pending" ? "success" : "pending",
      });

      if (!error) {
        toast.success(message);
        return;
      }

      toast.error(message);
    });
  }
  return (
    <TableRow key={todo._id}>
      {/* [Task-State] */}
      <TableCell className="font-medium">
        <Checkbox
          checked={todo.state === "success"}
          disabled={isUpdating}
          onCheckedChange={() => handleTaskStateUpdate({ todoId: todo._id })}
        />
      </TableCell>

      {/* [Task] */}
      <TableCell
        className={cn({
          "line-through": todo.state === "success",
        })}
      >
        <Input
          defaultValue={todo.task}
          className="border-0  shadow-none"
          disabled={isUpdating}
          onBlur={(e: FocusEvent<HTMLInputElement, Element>) => {
            if (
              e.target.value.trim() === todo.task ||
              !e.target.value.trim().length
            )
              return;
            handleTaskUpdate({
              e,
              todoId: todo._id,
            });
          }}
        />
      </TableCell>

      {/* [Task Date] */}
      <TableCell>{format(new Date(todo.date), "PPP")}</TableCell>

      {/* [Delete Button] */}
      <TableCell className="text-right">
        <ActionButton
          action={deleteTodoAction.bind(null, todo._id)}
          requireAreYouSure={true}
          disabled={isUpdating}
        >
          <Trash2 className="h-4 w-4" />
        </ActionButton>
      </TableCell>
    </TableRow>
  );
}
