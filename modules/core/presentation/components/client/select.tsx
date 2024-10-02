"use client";

import clsx from "clsx";
import { SelectHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Record<string, string>;
  errors?: string[];
  label?: string;
  placeholder?: string;
}

export default function Select({
  options,
  errors,
  label,
  placeholder,
  className,
  ...rest
}: SelectProps) {
  const { pending: formInProgress } = useFormStatus();

  return (
    <div>
      <label>
        {label}
        <select
          className={clsx(
            "mb-4 block h-10 w-full cursor-pointer rounded-md border pl-2 text-sm text-neutral-700 outline-2 disabled:cursor-not-allowed disabled:border-neutral-950 disabled:bg-neutral-600 disabled:text-neutral-950",
            className,
          )}
          disabled={formInProgress}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {Object.entries(options).map(([key, value]) => (
            <option key={value} value={key}>
              {value}
            </option>
          ))}
        </select>
      </label>

      {errors &&
        errors.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
    </div>
  );
}
