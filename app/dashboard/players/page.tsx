import { PlayersPage } from "@/src/pages/players";

interface PageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function Page(props: PageProps) {
  return <PlayersPage {...props} />;
}
