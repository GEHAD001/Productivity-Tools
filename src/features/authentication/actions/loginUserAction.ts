"use server";

import { loginUserQuery } from "../queries/loginUserQuery";
import { LoginFormFields } from "../schemas/LoginFormFields";
import { createSession } from "../utils/createSession";

export async function loginUserAction(data: LoginFormFields) {
  try {
    const result = await loginUserQuery(data);

    if (!result.success) {
      return {
        success: false,
        message: result.error,
      };
    }

    await createSession(result?.data?.id.toString() ?? "");

    return {
      success: true,
      message: "Login successful",
      redirect: "/app/todo", // Add redirect path to response
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    };
  }
}
