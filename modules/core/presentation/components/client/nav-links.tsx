"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiGameController, PiUsers } from "react-icons/pi";

const links = [
  { name: "Home", href: "/dashboard" },
  {
    name: "Players",
    href: "/dashboard/players",
    icon: <PiUsers />,
  },
  {
    name: "Accounts",
    href: "/dashboard/accounts",
    icon: <PiGameController />,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul>
      {links.map((link) => {
        return (
          <li key={link.name} className="mb-2">
            <Link
              href={link.href}
              className={clsx("flex items-center gap-2 rounded-md p-3", {
                "bg-neutral-600": pathname === link.href,
                "hover:bg-neutral-700": pathname !== link.href,
              })}
            >
              {link.icon} {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
