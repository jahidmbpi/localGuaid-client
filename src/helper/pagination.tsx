import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export default function PaginationC({
  pageArray,
  setCurrentPage,
  page,
}: {
  pageArray: number[];
  setCurrentPage: (page: number) => void;
  page: number;
}) {
  const firstItem = pageArray[0];
  const lastItem = pageArray.slice(-1)[0];
  return (
    <Pagination className="mt-8">
      <PaginationContent className="gap-1">
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={page === firstItem}
            onClick={() => {
              if (page > firstItem) {
                setCurrentPage(page - 1);
              }
            }}
            className="hover:bg-muted"
          />
        </PaginationItem>

        {pageArray.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              onClick={() => setCurrentPage(item)}
              className={cn(
                "w-10 h-10 rounded-md font-medium transition-all",
                page === item
                  ? "bg-green-700 text-white hover:bg-green-700 hover:text-white"
                  : "bg-[#1d65fc] text-white hover:bg-[#1d65fc] hover:text-white"
              )}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            aria-disabled={page === firstItem}
            onClick={() => {
              if (page < lastItem) {
                setCurrentPage(page + 1);
              }
            }}
            className="hover:bg-muted"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
