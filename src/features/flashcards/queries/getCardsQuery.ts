import connectToDB from "@/database/connection";
import Card, { CardType } from "@/database/models/Cards";

interface GetCardResponse {
  success: boolean;
  error?: string;
  totalPages?: number;
  currentPage?: number;
  data?: CardType[];
}

interface GetCardsQueryParams {
  flashcardId: string;
  userId: string;
  page?: number;
  limit?: number;
}

export async function getCardsQuery({
  flashcardId,
  userId,
  page = 1,
  limit = 5,
}: GetCardsQueryParams): Promise<GetCardResponse> {
  await connectToDB();
  try {
    const totalCards = await Card.countDocuments({ flashcard: flashcardId });
    const totalPages = Math.ceil(totalCards / limit);
    const skip = (page - 1) * limit;

    const cards = await Card.find({ flashcard: flashcardId, user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return {
      success: true,
      data: cards,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Failed to fetch cards for the specified flashcard",
    };
  }
}
