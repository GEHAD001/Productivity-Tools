import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center space-x-4">
      <Link
        href="/login"
        className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 rounded-md px-6 py-2"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 rounded-md px-6 py-2"
      >
        Register
      </Link>
    </div>
  );
}
