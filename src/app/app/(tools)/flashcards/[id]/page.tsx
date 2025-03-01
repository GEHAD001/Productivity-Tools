import Card from "@/database/models/Cards";
import CardForm from "@/features/flashcards/components/CardForm";
import React, { Suspense } from "react";
import Quiz from "@/features/flashcards/components/Quiz";
import { dataSerialization } from "@/lib/utils";
import connectToDB from "@/database/connection";
import CardStream from "@/features/flashcards/components/CardStream";

export default async function CardPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id: flashcardId } = await params;
  const search = await searchParams;
  const page = search.page ? parseInt(search.page, 10) : 1;

  // TODO: Build Caching System rather then fetch two-times.
  await connectToDB();
  const cards = await Card.find({ flashcard: flashcardId });

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <CardForm flashcardId={flashcardId} />
        <Quiz cards={dataSerialization(cards)} />
      </div>

      <Suspense
        key={`${flashcardId}-${page}`}
        fallback={
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        }
      >
        <CardStream flashcardId={flashcardId} page={page} />
      </Suspense>
    </div>
  );
}
