import React from "react";
import { getCardsQuery } from "../queries/getCardsQuery";
import { redirect } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CardList from "./CardList";
import { dataSerialization } from "@/lib/utils";
import { getCurrentUser } from "@/features/authentication/utils/getCurrentUser";

export default async function CardStream({
  flashcardId,
  page = 1,
}: {
  flashcardId: string;
  page?: number;
}) {
  const user = await getCurrentUser();
  const {
    data: cards,
    totalPages = 1,
    currentPage = 1,
  } = await getCardsQuery({ userId: user!.userId, flashcardId, page });

  if (totalPages === 0) return;

  if (page > totalPages) redirect(`/app/flashcards/${flashcardId}`);
  return (
    <div>
      <CardList cards={dataSerialization(cards!)} />
      <Pagination>
        <PaginationContent>
          {/* [PERVIOUS] */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`/app/flashcards/${flashcardId}?page=${currentPage - 1}`}
              />
            </PaginationItem>
          )}

          {/* [MIDDLE] */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={`/app/flashcards/${flashcardId}?page=${pageNumber}`}
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
                href={`/app/flashcards/${flashcardId}?page=${currentPage + 1}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
