"use client";

import {
  ComponentPropsWithRef,
  ReactNode,
  useState,
  useTransition,
} from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "sonner";

export function ActionButton({
  action,
  requireAreYouSure = false,
  ...props
}: Omit<ComponentPropsWithRef<typeof Button>, "onClick"> & {
  action: () => Promise<{
    error: boolean;
    message: string;
    data?: object | string;
  }>;
  requireAreYouSure: boolean;
}) {
  const [isLoading, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function performAction() {
    startTransition(async () => {
      const { error, message } = await action();
      if (!error) {
        toast.success(message);
        return;
      }

      toast.error(message);
    });
  }

  if (requireAreYouSure) {
    return (
      /* // in Loading State, can't close the dialog */
      <AlertDialog
        open={isDialogOpen || isLoading}
        onOpenChange={(open) => !isLoading && setIsDialogOpen(open)}
      >
        {/* [Dialog Trigger] */}
        <AlertDialogTrigger asChild>
          <Button {...props} onClick={() => setIsDialogOpen(true)} />
        </AlertDialogTrigger>

        {/* [Dialog Itself] */}
        <AlertDialogContent>
          {/* [Dialog Header => for message] */}
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* [Dialog Footer => for actions] */}
          <AlertDialogFooter>
            {/* [Cancel Action] */}
            <AlertDialogCancel
              className={cn(isLoading ? "opacity-50" : "opacity-100")}
            >
              Cancel
            </AlertDialogCancel>

            {/* [Confirm Action] */}
            <AlertDialogAction disabled={isLoading} onClick={performAction}>
              <LoadingTextSwap isLoading={isLoading}>Yes</LoadingTextSwap>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Button {...props} disabled={isLoading} onClick={performAction}>
      <LoadingTextSwap isLoading={isLoading}>{props.children}</LoadingTextSwap>
    </Button>
  );
}

/*
    @ grid for static size even text wider.
*/

function LoadingTextSwap({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid items-center justify-items-center">
      {/* Show whatever children that pass when it's not in Transaction */}
      <div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2",
          isLoading ? "invisible" : "visible"
        )}
      >
        {children}
      </div>

      {/* Show Loader in Transaction */}
      <div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2 text-center",
          isLoading ? "visible" : "invisible"
        )}
      >
        <Loader2Icon className="animate-spin" />
      </div>
    </div>
  );
}
