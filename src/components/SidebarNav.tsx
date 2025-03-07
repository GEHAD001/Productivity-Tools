"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileTextIcon,
  BrainCircuitIcon,
  CheckSquareIcon,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { deleteSession } from "@/features/authentication/utils/deleteSession";

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  username: string;
}

export function SidebarNav({ username, className }: SidebarNavProps) {
  const pathname = usePathname();

  const tools = [
    { label: "Todo", icon: CheckSquareIcon, href: "/app/todo" },
    { label: "Daily Note", icon: FileTextIcon, href: "/app/notes" },
    { label: "Flashcards", icon: BrainCircuitIcon, href: "/app/flashcards" },
  ];

  const user = [{ label: "Settings", icon: Settings, href: "/app/settings" }];

  return (
    <div className={cn("pb-12 min-h-full", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            All In One Tools
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-4 min-h-full">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Tools
          </h2>
          <ScrollArea className=" px-1">
            <div className="space-y-1">
              {tools.map((tool) => (
                <Button
                  key={tool.href}
                  variant={pathname === tool.href ? "secondary" : "ghost"}
                  className="w-full justify-start hover:scale-105 transition-transform"
                  asChild
                >
                  <Link href={tool.href}>
                    <tool.icon className="mr-2 h-4 w-4" />
                    {tool.label}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            User
          </h2>
          <ScrollArea className="h-[100px] px-1">
            <div className="space-y-1">
              {user.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start hover:scale-105 transition-transform"
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="min-h-fit" />

        <div className="mt-4 w-1/2 self-center">
          <p className="px-2 text-sm text-muted-foreground">
            Logged in as <span className="font-semibold">{username}</span>
          </p>
          <Button
            variant="destructive"
            className="w-full mt-2"
            onClick={() => {
              deleteSession();
              redirect("/login");
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
