"use client";

import { arrayRange } from "@/modules/core/infrastructure/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <div className="mx-auto flex">
        {currentPage > 1 && (
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
          />
        )}

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" = "middle";

            if (allPages.length === 1) position = "single";
            else if (index === 0 && currentPage === 1) position = "first";
            else if (
              index === allPages.length - 1 &&
              currentPage === totalPages
            )
              position = "last";

            return (
              <PaginationNumber
                key={index}
                href={createPageURL(page)}
                page={page}
                isActive={currentPage === page}
                position={position}
              />
            );
          })}
        </div>

        {currentPage < totalPages && (
          <PaginationArrow
            direction="right"
            href={createPageURL(currentPage + 1)}
          />
        )}
      </div>
    </>
  );
}

function PaginationArrow({
  href,
  direction,
}: {
  href: string;
  direction: "left" | "right";
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center border hover:bg-neutral-700",
    {
      "rounded-l-md": direction === "left",
      "rounded-r-md": direction === "right",
    },
  );
  const icon = direction === "left" ? "<" : ">";
  return (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
  position: "first" | "last" | "single" | "middle";
}) {
  const isElipsis = isNaN(+page);
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first",
      "rounded-r-md": position === "last",
      "rounded-md": position === "single",
      "bg-neutral-600  text-white": isActive,
      "hover:bg-neutral-700": !isActive && !isElipsis,
      "text-gray-300": isElipsis,
    },
  );

  return isActive || isElipsis ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function generatePagination(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [...arrayRange(1, currentPage + 1, 1), "...", totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, "...", ...arrayRange(currentPage - 1, totalPages, 1)];
  }
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}
