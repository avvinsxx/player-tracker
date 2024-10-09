"use client";

import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string[];
  label?: string;
}

export function Input({ errors, label, className, ...rest }: InputProps) {
  const { pending: formInProgress } = useFormStatus();

  return (
    <div className="mb-4">
      <label>
        {label}
        <input
          className={clsx(
            "block h-10 w-full rounded-md border pl-2 text-sm text-neutral-700 outline-2 disabled:cursor-not-allowed disabled:border-neutral-950 disabled:bg-neutral-600 disabled:text-neutral-950",
            className,
          )}
          disabled={formInProgress}
          {...rest}
        />
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
