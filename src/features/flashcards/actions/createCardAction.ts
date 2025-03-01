"use server";

import { revalidatePath } from "next/cache";
import { createCard } from "../queries/createCardQuery";
import { CardFormFields, cardFormValidator } from "../schemas/CardFormFields";
import connectToDB from "@/database/connection";
import User from "@/database/models/User";

export async function createCardAction(
  values: CardFormFields,
  flashcardId: string
) {
  try {
    await connectToDB();
    const userId = (await User.find()).at(0)._id;
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
      userId,
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
