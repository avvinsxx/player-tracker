"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";

import { Button } from "./button";

interface DropdownProps {
  label: string;
  icon?: ReactNode;
  items: { label: string; href: string }[];
}

function Dropdown({ label, icon, items }: DropdownProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <div>
        <Button type="button" onClick={() => setVisible((v) => !v)}>
          {label}&nbsp;{icon}
        </Button>
      </div>

      {visible && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-neutral-200 py-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-300 focus:bg-neutral-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
