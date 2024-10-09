import Image from "next/image";

import { Logout } from "@/src/features/logout";
import { getSession } from "@/src/shared/api";
import { Logo, NavLinks } from "@/src/shared/ui";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(); // TODO switch to get user from SB
  return (
    <div className="grid h-screen grid-cols-[15%_1fr] grid-rows-[4rem_1fr] overflow-y-auto bg-neutral-800 text-neutral-200">
      <div className="row-span-2 flex flex-col gap-5 border-r-2 border-r-neutral-700 px-3 py-5">
        <Logo />
        <NavLinks />
      </div>
      <div className="flex items-center justify-end border-b-2 border-b-neutral-700 px-5">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            src={`/img/avatar.jpg`}
            width={30}
            height={30}
            alt={`user ${session?.user.email}`}
            title={`user ${session?.user.email}`}
          />
          {session?.user.email}
          <Logout />
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
