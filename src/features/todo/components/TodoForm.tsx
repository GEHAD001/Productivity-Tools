"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "@/components/ui/date-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TodoFormFields, todoFormValidator } from "../schemas/TodoFormFields";
import { createTodoAction } from "../actions/createTodoAction";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function TodoForm() {
  const searchParams = useSearchParams();

  const dateParam = searchParams.get("date");

  const form = useForm<TodoFormFields>({
    resolver: zodResolver(todoFormValidator),
    defaultValues: {
      task: "",
      date: dateParam ? new Date(dateParam) : new Date(),
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: TodoFormFields) {
    startTransition(async () => {
      try {
        const { error, message } = await createTodoAction(values);

        if (!error) {
          toast.success(message);
          form.reset();
          setIsDialogOpen(false);
        } else {
          toast.error(message || "Failed to create todo");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <Dialog
      open={isDialogOpen || isPending}
      onOpenChange={(open) => !isPending && setIsDialogOpen(open)}
    >
      {/* [Dialog Trigger] */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsDialogOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold">Create Todo</DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Add a new task to your todo list.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* [TASK-FIELD] */}
            <FormField
              control={form.control}
              name="task"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your task"
                      type="text"
                      disabled={isPending}
                      className="h-11 px-4 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            {/* [DATE-FIELD] */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker date={field.value} onSelect={field.onChange} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 h-11 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Task"}
            </Button>
          </motion.form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
