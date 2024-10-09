import { Suspense } from "react";
import { PiPlusBold } from "react-icons/pi";

import { getTotalPages } from "@/src/entities/account";
import { TableSearch } from "@/src/features/table-search";
import { PageHeader, Pagination, TableLoader } from "@/src/shared/ui";
import Dropdown from "@/src/shared/ui/dropdown";
import Table from "./table";

interface AccountsPageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export async function AccountsPage({ searchParams }: AccountsPageProps) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getTotalPages(query);
  return (
    <div>
      <PageHeader>Accounts</PageHeader>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <TableSearch placeholder="Search accounts..." />
        <Dropdown
          label="Add account"
          icon={<PiPlusBold />}
          items={[
            {
              label: "League of Legends",
              href: "/dashboard/accounts/lol",
            },
            {
              label: "Dota 2",
              href: "/dashboard/accounts/dota2",
            },
          ]}
        />
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
