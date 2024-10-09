import { AccountDota2Page } from "@/src/pages/account-dota2";

interface PageProps {
  params: { id: string };
}

export default async function Page(props: PageProps) {
  return <AccountDota2Page {...props} />;
}
