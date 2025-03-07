"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SidebarNav } from "@/components/SidebarNav";
import { DialogTitle } from "@radix-ui/react-dialog";

interface MobileSheetProps {
  username: string;
}

export function MobileSheet({ username }: MobileSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-40 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-80">
        <div className="hidden">
          <DialogTitle />
        </div>
        <SidebarNav username={username} className="w-full" />
      </SheetContent>
    </Sheet>
  );
}
