import { AccountsPage } from "@/src/pages/accounts";

interface PageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function Page(props: PageProps) {
  return <AccountsPage {...props} />;
}
