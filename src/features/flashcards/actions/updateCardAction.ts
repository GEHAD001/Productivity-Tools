"use server";

import { revalidatePath } from "next/cache";
import { CardFormFields, cardFormValidator } from "../schemas/CardFormFields";
import connectToDB from "@/database/connection";
import Card from "@/database/models/Cards";
import { getCurrentUser } from "@/features/authentication/utils/getCurrentUser";

export async function updateCardAction({
  values,
  cardId,
}: {
  values: Partial<CardFormFields>;
  cardId: string;
}) {
  try {
    await connectToDB();

    const user = await getCurrentUser();

    // Validate the provided fields
    const validatedFields = cardFormValidator.partial().safeParse(values);

    if (!validatedFields.success) {
      return {
        error: true,
        message: "Invalid fields",
      };
    }

    // Find and update the card
    const updatedCard = await Card.findOneAndUpdate(
      { _id: cardId, user: user!.userId },
      validatedFields.data,
      { new: true }
    );

    if (!updatedCard) {
      return {
        error: true,
        message: "Card not found",
      };
    }

    revalidatePath("/");

    return {
      error: false,
      message: "Card updated successfully",
      data: JSON.stringify(updatedCard),
    };
  } catch (error) {
    console.error("Error updating card:", error);
    return {
      error: true,
      message: "Something went wrong",
    };
  }
}
