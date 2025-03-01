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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CardFormFields, cardFormValidator } from "../schemas/CardFormFields";
import { updateCardAction } from "../actions/updateCardAction";

export default function UpdateCardForm({
  cardId,
  defaultValues,
}: {
  cardId: string;
  defaultValues: CardFormFields;
}) {
  const form = useForm<CardFormFields>({
    resolver: zodResolver(cardFormValidator),
    defaultValues,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: CardFormFields) {
    startTransition(async () => {
      try {
        // NOTE: OS are different in splinting the url, `should solve that`
        const { error, message } = await updateCardAction({ values, cardId });

        if (!error) {
          toast.success(message);
          form.reset();
          setIsDialogOpen(false);
          return;
        }
        toast.error(message ?? "something went wrong");
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    });
  }

  return (
    <Dialog
      open={isDialogOpen || isPending}
      onOpenChange={(open) => !isPending && setIsDialogOpen(open)}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsDialogOpen(true)}
          className="p-2 text-gray-500 hover:text-blue-500 transition-colors duration-200"
        >
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold">Add New Card</DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Update a card for your flashcard set.
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
            {/* [FRONT CONTENT FIELD] */}
            <FormField
              control={form.control}
              name="front"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter front content"
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

            {/* [BACK CONTENT FIELD] */}
            <FormField
              control={form.control}
              name="back"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter back content"
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

            {/* [VISIBILITY FIELD] */}
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="private" />
                        <Label htmlFor="private">Private</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="public" />
                        <Label htmlFor="public">Public</Label>
                      </div>
                    </RadioGroup>
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
              {isPending ? "Updating..." : "Update Card"}
            </Button>
          </motion.form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
