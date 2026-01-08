/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationC({
  pageArray,
  setCurrentPage,
  page,
}: {
  pageArray: number[];
  setCurrentPage: (page: number) => void;
  page: any;
}) {
  console.log(pageArray);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setCurrentPage(page - 1)}
            size="default"
          />
        </PaginationItem>
        <PaginationItem>
          {pageArray.map((item, index) => (
            <PaginationLink
              onClick={() => setCurrentPage(item)}
              size="default"
              key={index}
              isActive={page === item}
            >
              {item}
            </PaginationLink>
          ))}
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => setCurrentPage(page + 1)}
            size="default"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
