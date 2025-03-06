"use server";

import connectToDB from "@/database/connection";
import Flashcard, { FlashcardType } from "@/database/models/FlashCard";

export interface GetFlashcardsResponse {
  success: boolean;
  data?: FlashcardType[];
  error?: string;
  totalPages?: number;
  currentPage?: number;
}

export async function getAllFlashcardsQuery(
  userId: string
): Promise<GetFlashcardsResponse> {
  await connectToDB();
  try {
    const flashcards = await Flashcard.find({ user: userId }).sort({
      date: -1,
    });

    return { success: true, data: flashcards };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to fetch flashcards" };
  }
}

export async function getFlashcardsQuery(
  userId: string,
  page: number = 1,
  limit: number = 5
): Promise<GetFlashcardsResponse> {
  await connectToDB();
  try {
    const totalFlashcards = await Flashcard.countDocuments({ user: userId });
    const totalPages = Math.ceil(totalFlashcards / limit);
    const skip = (page - 1) * limit;

    const flashcards = await Flashcard.find({ user: userId })
      .sort({ dateCreate: -1 })
      .skip(skip)
      .limit(limit);

    return {
      success: true,
      data: flashcards,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Failed to fetch flashcards for the specified date",
    };
  }
}
