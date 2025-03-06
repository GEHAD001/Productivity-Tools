import { dataSerialization } from "@/lib/utils";
import { getFlashcardsQuery } from "../queries/getFlashcardsQuery";
import FlashcardList from "./FlashcardList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/authentication/utils/getCurrentUser";

async function FlashcardStream({ page = 1 }: { page?: number }) {
  const user = await getCurrentUser();

  // Error: Recursion Rendering
  const {
    data: flashcards,
    totalPages = 1,
    currentPage = 1,
  } = await getFlashcardsQuery(user!.userId, page);

  if (totalPages && page > totalPages) redirect("/app/flashcards");

  return (
    <div className="flex flex-col gap-4">
      <FlashcardList flashcards={dataSerialization(flashcards!)} />

      <Pagination>
        <PaginationContent>
          {/* [PERVIOUS] */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`/app/flashcards?page=${currentPage - 1}`}
              />
            </PaginationItem>
          )}

          {/* [MIDDLE] */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={`/app/flashcards?page=${pageNumber}`}
                  isActive={pageNumber === currentPage}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* [NEXT] */}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                href={`/app/flashcards?page=${currentPage + 1}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default FlashcardStream;
