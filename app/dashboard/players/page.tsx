import { Suspense } from "react";

import PlayerService from "@/modules/core/infrastructure/player/service";
import Pagination from "@/modules/core/presentation/components/client/pagination";
import AddButton from "@/modules/core/presentation/components/client/player/add-button/add-button";
import Search from "@/modules/core/presentation/components/client/search";
import PageHeader from "@/modules/core/presentation/components/server/page-header";
import Table from "@/modules/core/presentation/components/server/player/table";
import TableLoader from "@/modules/core/presentation/components/server/table-loader";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await PlayerService.getPlayersPages(query);
  return (
    <div className="flex h-full flex-col">
      <PageHeader>Players</PageHeader>
      <div className="mt-4 flex items-center justify-between gap-2">
        <Search placeholder="Search players..." />
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
