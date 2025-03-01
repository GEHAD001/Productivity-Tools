"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { createFlashcardAction } from "../actions/createFlashcardAction";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
import {
  FlashcardFormFields,
  flashcardFormValidator,
} from "../schemas/FlashcardFormFields";

export default function FlashCardForm() {
  const form = useForm<FlashcardFormFields>({
    resolver: zodResolver(flashcardFormValidator),
    defaultValues: {
      name: "",
      visibility: "private",
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: FlashcardFormFields) {
    startTransition(async () => {
      try {
        const response = await createFlashcardAction(values);

        if (!response.error) {
          toast.success(response.message);
          form.reset();
          setIsDialogOpen(false);
        } else {
          toast.error(response.message || "Failed to create flashcard");
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
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsDialogOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Flashcard
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold">
            Create Flashcard
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Create a new flashcard set for your study materials.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            {/* [FLASH-CARD NAME FIELD] */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter flashcard set name"
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
              {isPending ? "Creating..." : "Create Flashcard"}
            </Button>
          </motion.form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
