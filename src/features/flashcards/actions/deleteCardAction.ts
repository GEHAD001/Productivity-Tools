"use server";

import Card from "@/database/models/Cards";
import { getCurrentUser } from "@/features/authentication/utils/getCurrentUser";
import { revalidatePath } from "next/cache";

export async function deleteCardAction(cardId: string) {
  try {
    const user = await getCurrentUser();
    const card = await Card.findOne({ _id: cardId, user: user!.userId });

    if (!card) {
      return {
        error: true,
        message: "Card not found",
      };
    }

    await Card.findByIdAndDelete(cardId);

    revalidatePath("/app/flashcards/[id]", "page");

    return {
      error: false,
      message: "Card deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting card:", error);
    return {
      error: true,
      message: "Failed to delete card",
    };
  }
}
