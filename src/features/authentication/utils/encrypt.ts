import { encodedKey } from "./keys";
import { SignJWT } from "jose";

export async function encrypt(
  userId: string,
  username: string,
  expiresAt: Date
): Promise<string> {
  try {
    if (!encodedKey) {
      throw new Error("Session secret is not configured");
    }

    return await new SignJWT({ userId, username, expiresAt })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey);
  } catch (error) {
    console.error("Failed to encrypt payload:", error);
    throw error;
  }
}
