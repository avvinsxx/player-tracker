import PageHeader from "@/modules/core/presentation/components/server/page-header";
import SearchForm from "@/modules/lol/presentation/components/client/search-form/search-form";

export default function Page() {
  return (
    <div>
      <PageHeader>Search account</PageHeader>
      <SearchForm />
    </div>
  );
}
