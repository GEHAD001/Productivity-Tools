import { cookies } from "next/headers";
import { encrypt } from "./encrypt";

export async function createSession(userId: string) {
  // Setup Token
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const payload = { userId, expiresAt }; // Generate Token Claims
  const session = await encrypt(payload);

  // Store Token at user browser, and read-only by server.
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}
