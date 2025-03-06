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

export default function Sidebar({
  username,
  className,
}: React.HTMLAttributes<HTMLDivElement> & { username: string }) {
  const pathname = usePathname();

  const tools = [
    {
      label: "Todo",
      icon: CheckSquareIcon,
      href: "/app/todo",
    },
    {
      label: "Daily Note",
      icon: FileTextIcon,
      href: "/app/notes",
    },
    {
      label: "Flashcards",
      icon: BrainCircuitIcon,
      href: "/app/flashcards",
    },
  ];

  const user = [
    {
      label: "Settings",
      icon: Settings,
      href: "/app/settings",
    },
  ];

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        {/* [Sidebar Title] */}
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            All In One Tools
          </h2>
        </div>

        {/* [Sidebar-Section Tools] */}
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Tools
          </h2>
          <ScrollArea className="h-[120px] px-1">
            <div className="space-y-1">
              {tools.map((tool) => (
                <Button
                  key={tool.href}
                  variant={pathname === tool.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
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

        {/* [Sidebar-Section User] */}
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
                  className="w-full justify-start"
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
          <div>
            <p className="px-2 text-sm text-gray-400">
              Logged in as <span className="font-semibold">{username}</span>
            </p>
          </div>
          <Button
            onClick={() => {
              deleteSession();
              redirect("/login");
            }}
          >
            <LogOut /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
