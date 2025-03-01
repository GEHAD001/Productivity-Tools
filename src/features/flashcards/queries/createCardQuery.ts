import Card from "@/database/models/Cards";
import connectToDB from "@/database/connection";

export interface CreateCardParams {
  front: string;
  back: string;
  visibility: "public" | "private";
  userId: string;
  flashcardId: string;
}

export async function createCard({
  front,
  back,
  visibility,
  userId,
  flashcardId,
}: CreateCardParams) {
  try {
    await connectToDB();
    const card = await Card.create({
      front,
      back,
      visibility,
      user: userId,
      flashcard: flashcardId,
    });

    return { success: true, data: card };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create card" };
  }
}