import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h2 className="text-5xl">Not Found</h2>
      <p className="text-xl">Could not find requested Account</p>
      <Link href="/dashboard/accounts">Go to Accounts list</Link>
    </div>
  );
}
