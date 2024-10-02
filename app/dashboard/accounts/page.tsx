import { Suspense } from "react";
import { PiPlusBold } from "react-icons/pi";

import AccountService from "@/modules/core/infrastructure/account";
import Dropdown from "@/modules/core/presentation/components/client/dropdown";
import Pagination from "@/modules/core/presentation/components/client/pagination";
import Search from "@/modules/core/presentation/components/client/search";
import Table from "@/modules/core/presentation/components/server/account/table";
import PageHeader from "@/modules/core/presentation/components/server/page-header";
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
  const totalPages = await AccountService.getAccountsPages(query);
  return (
    <div>
      <PageHeader>Accounts</PageHeader>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search accounts..." />
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
