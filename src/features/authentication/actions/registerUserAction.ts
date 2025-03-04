"use server";

import { RegisterFormFields } from "../schemas/RegisterFormFields";
import { registerUserQuery } from "../queries/registerUserQuery";
import { createSession } from "../utils/createSession";

export async function registerUserAction(data: RegisterFormFields) {
  try {
    // const { confirmPassword, ...userData } = data;

    const result = await registerUserQuery(data);

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
      message: error instanceof Error ? error.message : "Registration failed",
    };
  }
}
