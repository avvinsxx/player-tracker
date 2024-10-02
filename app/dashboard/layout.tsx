import Image from "next/image";

import AuthService from "@/modules/core/infrastructure/auth";
import Logout from "@/modules/core/presentation/components/client/auth/logout/logout";
import NavLinks from "@/modules/core/presentation/components/client/nav-links";
import Logo from "@/modules/core/presentation/components/server/logo";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await AuthService.getSession();
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
