import Flashcard from "@/database/models/FlashCard";
import { format } from "date-fns";
import Link from "next/link";

// import { deleteFlashcardAction } from "../actions/deleteFlashcardAction";

interface Flashcard {
  _id: string;
  name: string;
  visibility: "public" | "private";
  dateCreate: Date;
}

interface FlashcardListProps {
  flashcards: Flashcard[];
}

export default function FlashcardList({ flashcards }: FlashcardListProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashcards.map((flashcard) => (
          <Link
            key={flashcard._id}
            href={`/app/flashcards/${flashcard._id}`}
            className="group"
          >
            <div className="h-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex flex-col h-full justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors duration-200">
                    {flashcard.name}
                  </h2>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        flashcard.visibility === "private"
                          ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      }`}
                    >
                      {flashcard.visibility}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 ">
                  {format(flashcard.dateCreate, "PPP")}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {flashcards.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            No flashcards yet
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating your first flashcard.
          </p>
        </div>
      )}
    </div>
  );
}
