"use client";

import { ButtonHTMLAttributes, useState } from "react";
import toast from "react-hot-toast";
import { PiArrowClockwiseBold } from "react-icons/pi";

import { Button } from "@/src/shared/ui";
import { refreshLolAction } from "../api/refresh-lol-action";

interface RefreshButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  accountId: number;
}

export function RefreshButtonLol({ accountId, ...rest }: RefreshButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      onClick={async () => {
        setIsLoading(true);
        try {
          const res = await refreshLolAction(accountId);
          if (res?.message) {
            toast.error(res.message);
          } else {
            toast.success("Account data refreshed");
          }
        } catch (err) {
          console.error(err);
          toast.error("Error in Account refreshing");
        }
        setIsLoading(false);
      }}
      pending={isLoading}
      title="Refresh Account Information"
      disabled={isLoading}
      {...rest}
    >
      <PiArrowClockwiseBold size={16} />
    </Button>
  );
}
