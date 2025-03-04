import { cookies } from "next/headers";
import { decrypt } from "./decrypt";

export async function getCurrentUser() {
  const session = (await cookies()).get("session")?.value;

  if (session) {
    return await decrypt(session);
  }

  return session;
}
