"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { Spinner } from "./spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  pending?: boolean;
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  variant = "secondary",
  pending = false,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const { pending: formInProgress } = useFormStatus();

  return (
    <button
      className={clsx(
        "flex h-10 items-center justify-center gap-x-2 rounded-md px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed",
        className,
        {
          "bg-blue-500 hover:bg-blue-900": variant === "primary",
          "border-[1px] border-neutral-100": variant === "secondary",
        },
      )}
      disabled={pending || formInProgress || disabled}
      {...rest}
    >
      {pending || formInProgress ? (
        <>
          <Spinner size="small" />
        </>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}
