import { JWTPayload, jwtVerify } from "jose";
import { encodedKey } from "./keys";
import { Payload } from "./types";

export async function decrypt(
  session: string | undefined = ""
): Promise<(Payload & JWTPayload) | undefined> {
  try {
    const { payload }: { payload: Payload & JWTPayload } = await jwtVerify(
      session,
      encodedKey,
      {
        algorithms: ["HS256"],
      }
    );

    return payload;
  } catch {
    return undefined;
  }
}
