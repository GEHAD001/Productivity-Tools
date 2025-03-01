import Flashcard from "@/database/models/FlashCard";
import connectToDB from "@/database/connection";
import { FlashcardFormFields } from "../schemas/FlashcardFormFields";

export interface CreateFlashcardParams extends FlashcardFormFields {
  userId: string;
}

export async function createFlashcard({
  name,
  visibility,
  userId,
}: CreateFlashcardParams) {
  try {
    await connectToDB();
    const flashcard = await Flashcard.create({
      name,
      visibility,
      user: userId,
    });

    return { success: true, data: flashcard };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create todo" };
  }
}
