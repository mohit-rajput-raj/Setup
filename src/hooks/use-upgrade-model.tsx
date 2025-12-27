"use client";

import { useState } from "react";
import { TRPCClientError } from "@trpc/client";
import { UpgradeModel } from "@/components/alert-dialouge";

export function useUpgradeModal() {
  const [open, setOpen] = useState(false);

  const handleError = (error: unknown) => {
    if (error instanceof TRPCClientError) {
      if (error.data?.code === "FORBIDDEN") {
        setOpen(true);
        return true;
      }
    }
    return false;
  };

  const modal = (
    <UpgradeModel open={open} onClose={setOpen} />
  );

  return { handleError, modal };
}
