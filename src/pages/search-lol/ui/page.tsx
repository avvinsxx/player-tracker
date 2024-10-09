import SearchForm from "@/modules/lol/presentation/components/client/search-form/search-form";
import { PageHeader } from "@/src/shared/ui";

export function Page() {
  return (
    <div>
      <PageHeader>Search account</PageHeader>
      <SearchForm />
    </div>
  );
}
