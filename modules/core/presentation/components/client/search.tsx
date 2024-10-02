"use client";

import { useDebounce } from "@/modules/core/presentation/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CiSearch } from "react-icons/ci";

interface SearchProps {
  placeholder?: string;
}

export default function Search({ placeholder }: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebounce((query) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative">
      <input
        className="block h-10 w-full rounded-md border pl-9 text-sm text-neutral-700 outline-2"
        placeholder={placeholder}
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <CiSearch className="absolute left-2 top-2 h-6 w-6 text-neutral-700" />
    </div>
  );
}
