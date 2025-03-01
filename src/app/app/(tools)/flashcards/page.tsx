import FlashCardForm from "@/features/flashcards/components/FlashCardForm";
import FlashcardStream from "@/features/flashcards/components/FlashcardStream";
import React, { Suspense } from "react";

export default async function FlashCardsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page, 10) : 1;

  return (
    <div className="w-full min-h-screen py-8 space-y-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Flashcards
        </h1>
        <FlashCardForm />
      </div>

      <Suspense
        key={`${page}`}
        fallback={
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        }
      >
        <FlashcardStream page={page} />
      </Suspense>
    </div>
  );
}
