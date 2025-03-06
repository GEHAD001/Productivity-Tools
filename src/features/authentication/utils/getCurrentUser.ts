import { cookies } from "next/headers";
import { decrypt } from "./decrypt";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const session = (await cookies()).get("session")?.value;

  if (session !== undefined) {
    return await decrypt(session);
  }

  redirect("/login");
}
