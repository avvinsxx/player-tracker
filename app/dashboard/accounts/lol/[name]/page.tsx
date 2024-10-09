import { AccountLolPage } from "@/src/pages/account-lol";

interface PageProps {
  searchParams: {
    tag: string;
    platform: string;
  };
  params: { name: string };
}

export default async function Page(props: PageProps) {
  return <AccountLolPage {...props} />;
}
