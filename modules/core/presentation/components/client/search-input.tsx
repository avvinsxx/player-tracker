"use client";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

interface SearchInputProps extends HTMLAttributes<HTMLInputElement> {
  items: Record<string, string>[];
  errors?: string[];
  onItemSelect: (value: string) => void;
}

export default function SearchInput({
  errors,
  items,
  onItemSelect,
  ...rest
}: SearchInputProps) {
  const [visibleItems, setVisibleItems] =
    useState<Record<string, string>[]>(items);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    function () {
      setVisibleItems(
        items.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    },
    [query, setVisibleItems, items],
  );

  function outsideClickHandler(e: MouseEvent): any {
    if (dropdownRef.current) {
      const includesPopoverElement = e
        .composedPath()
        .includes(dropdownRef.current);
      if (!includesPopoverElement) {
        setShowDropdown(false);
      }
    }
  }

  useEffect(() => {
    document.body.addEventListener("click", outsideClickHandler);
    return () => {
      document.body.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  return (
    <div>
      <label className="mb-2 block">Select player to attach account</label>
      <div className="relative" ref={dropdownRef} {...rest}>
        <input
          onFocus={() => setShowDropdown(true)}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onItemSelect(""); //todo it's ok? to call on every change
          }}
          className="block h-10 w-[100%] rounded-md pl-2 text-neutral-700"
        />
        {errors &&
          errors.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        {showDropdown && (
          <div className="scrollbar absolute right-0 top-11 max-h-24 w-[100%] overflow-y-auto rounded-md bg-neutral-200 py-1">
            {visibleItems?.length ? (
              visibleItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    setQuery(item.label);
                    onItemSelect(item.value);
                    setShowDropdown(false);
                  }}
                  className="block w-[100%] p-2 text-left text-neutral-700 hover:bg-neutral-300 focus:bg-neutral-300"
                  type="button"
                >
                  {item.label}
                </button>
              ))
            ) : (
              <div className="w-[100%] p-2 text-center text-sm text-neutral-700">
                No results
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
