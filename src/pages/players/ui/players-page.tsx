import { Suspense } from "react";

import { getTotalPages } from "@/src/entities/player";
import { TableSearch } from "@/src/features/table-search";
import { PageHeader, Pagination, TableLoader } from "@/src/shared/ui";

import { AddButton } from "./add-button";
import { Table } from "./table";

interface PlayersPageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export async function PlayersPage({ searchParams }: PlayersPageProps) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getTotalPages(query);

  return (
    <div className="flex h-full flex-col">
      <PageHeader>Players</PageHeader>
      <div className="mt-4 flex items-center justify-between gap-2">
        <TableSearch placeholder="Search players..." />
        <AddButton className="mb-4" />
      </div>
      <Suspense key={query + currentPage} fallback={<TableLoader />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      {totalPages > 1 && (
        <div className="justify-content mt-5 flex w-full">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
