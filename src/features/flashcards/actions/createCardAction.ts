"use server";

import { revalidatePath } from "next/cache";
import { createCard } from "../queries/createCardQuery";
import { CardFormFields, cardFormValidator } from "../schemas/CardFormFields";
import connectToDB from "@/database/connection";
import { getCurrentUser } from "@/features/authentication/utils/getCurrentUser";

export async function createCardAction(
  values: CardFormFields,
  flashcardId: string
) {
  try {
    await connectToDB();
    const user = await getCurrentUser();
    const validatedFields = cardFormValidator.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: true,
        message: "Invalid fields",
      };
    }

    console.log("Here ?");

    const result = await createCard({
      front: validatedFields.data.front,
      back: validatedFields.data.back,
      visibility: validatedFields.data.visibility,
      userId: user!.userId,
      flashcardId,
    });

    if (!result.success) {
      return { error: true, message: result.error ?? "error" };
    }

    revalidatePath("/");

    return {
      error: false,
      message: "Card created successfully",
      data: JSON.stringify(result.data),
    };
  } catch (error) {
    console.error("Error creating card:", error);
    return {
      error: true,
      message: "Something went wrong",
    };
  }
}
