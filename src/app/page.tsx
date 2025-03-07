import { DotPattern } from "@/components/magicui/dot-pattern";
import { ArrowRightIcon, LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <DotPattern className="absolute inset-0 opacity-50" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-primary mb-4 animate-fade-in">
          All-in-One Tools
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl animate-fade-in-up">
          Your complete toolkit for modern development. Streamline your workflow
          with our comprehensive suite of tools.
        </p>
        <div className="flex items-center justify-center space-x-4 animate-fade-in-up">
          <Link
            href="/login"
            className="bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-9 rounded-md px-6 py-2 transition-colors"
          >
            <div className="flex justify-center items-center gap-1">
              <span className="font-semibold">Login</span>
              <LogIn
                size={18}
                color="white"
                className="motion-translate-x-loop-50 motion-duration-[1850ms]"
              />
            </div>
          </Link>
          <Link
            href="/register"
            className="bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-9 rounded-md px-4 py-2 transition-colors"
          >
            <div className="flex justify-center items-center gap-1">
              <span className="font-semibold">Register</span>
              <ArrowRightIcon
                size={18}
                color="white"
                className="motion-translate-x-loop-50 motion-duration-[1850ms]"
              />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
