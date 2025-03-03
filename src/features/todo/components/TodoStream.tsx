import { dataSerialization } from "@/lib/utils";
import { getTodosByDateQuery } from "../queries/getTodosQuery";
import TodoList from "./TodoList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

async function TodoStream({ date, page = 1 }: { date: Date; page?: number }) {
  const {
    data: todos,
    totalPages = 1,
    currentPage = 1,
  } = await getTodosByDateQuery(date, page);

  return (
    <div className="flex flex-col gap-4">
      <TodoList
        todos={dataSerialization(
          // @ts-ignore
          todos
        )}
      />
      <Pagination>
        <PaginationContent>
          {/* [PERVIOUS] */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`/app/todo?date=${date.toISOString()}&page=${
                  currentPage - 1
                }`}
              />
            </PaginationItem>
          )}

          {/* [MIDDLE] */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={`/app/todo?date=${date.toISOString()}&page=${pageNumber}`}
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
                href={`/app/todo?date=${date.toISOString()}&page=${
                  currentPage + 1
                }`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default TodoStream;
