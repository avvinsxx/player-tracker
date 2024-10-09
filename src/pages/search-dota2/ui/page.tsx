import { PageHeader } from "@/src/shared/ui";
import SearchForm from "./search-form";

export function Page() {
  return (
    <div>
      <PageHeader>Search account</PageHeader>
      <SearchForm />
    </div>
  );
}
