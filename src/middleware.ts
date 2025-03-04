import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./features/authentication/utils/decrypt";

// Define Routes
const publicRoutes = ["/", "/login"];

export default async function middleware(request: NextRequest) {
  // Read URL to See if is Protected or Public Route
  const path = request.nextUrl.pathname;
  const isProtectedRoute = path.split("/").includes("app");
  const isPublicRoute = publicRoutes.includes(path);

  // Get & Decrypt Session
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // Check User
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/app/todo", request.nextUrl));
  }

  return NextResponse.next();
}
