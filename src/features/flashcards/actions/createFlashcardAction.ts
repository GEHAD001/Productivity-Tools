"use server";
import { revalidatePath } from "next/cache";
import { createFlashcard } from "../queries/createFlashcardQuery";
import {
  FlashcardFormFields,
  flashcardFormValidator,
} from "../schemas/FlashcardFormFields";
import connectToDB from "@/database/connection";
import User from "@/database/models/User";

export async function createFlashcardAction(values: FlashcardFormFields) {
  try {
    await connectToDB();
    const userId = (await User.find()).at(0)._id;
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
      userId,
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
