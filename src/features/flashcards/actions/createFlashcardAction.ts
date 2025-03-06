"use server";
import { revalidatePath } from "next/cache";
import { createFlashcard } from "../queries/createFlashcardQuery";
import {
  FlashcardFormFields,
  flashcardFormValidator,
} from "../schemas/FlashcardFormFields";
import connectToDB from "@/database/connection";
import { getCurrentUser } from "@/features/authentication/utils/getCurrentUser";

export async function createFlashcardAction(values: FlashcardFormFields) {
  try {
    await connectToDB();
    const user = await getCurrentUser();
    const validatedFields = flashcardFormValidator.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: true,
        message: "Invalid fields",
      };
    }

    const result = await createFlashcard({
      name: validatedFields.data.name,
      visibility: validatedFields.data.visibility,
      userId: user!.userId,
    });

    if (!result.success) {
      return { error: true, message: result.error ?? "error" };
    }

    revalidatePath("/");

    return {
      error: false,
      message: "Flashcard created successfully",
      data: JSON.stringify(result.data),
    };
  } catch (error) {
    console.error("Error creating flashcard:", error);
    return {
      error: true,
      message: "Something went wrong",
    };
  }
}
