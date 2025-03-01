"use server";

import Card from "@/database/models/Cards";
import { revalidatePath } from "next/cache";

export async function deleteCardAction(cardId: string) {
  try {
    const card = await Card.findById(cardId);

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