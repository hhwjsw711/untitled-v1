"use client";

import type { InvoiceFormValues } from "@/actions/invoice/schema";
import { Icons } from "@v1/ui/icons";
import { useFormContext } from "react-hook-form";

export function Logo() {
  const { watch, setValue } = useFormContext<InvoiceFormValues>();
  const logoUrl = watch("template.logo_url");

  return (
    <div className="relative h-[80px] group">
      <div className="block h-full">
        {logoUrl ? (
          <>
            <img
              src={logoUrl}
              alt="Invoice logo"
              className="h-full w-auto max-w-none object-contain"
            />
            <button
              type="button"
              className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-col gap-1"
              style={{ width: "auto" }}
              onClick={() => setValue("template.logo_url", undefined)}
            >
              <Icons.Clear className="size-4" />
              <span className="text-xs font-medium">Remove</span>
            </button>
          </>
        ) : (
          <div className="h-[80px] w-[80px] bg-[repeating-linear-gradient(-60deg,#DBDBDB,#DBDBDB_1px,transparent_1px,transparent_5px)] dark:bg-[repeating-linear-gradient(-60deg,#2C2C2C,#2C2C2C_1px,transparent_1px,transparent_5px)]" />
        )}
      </div>
    </div>
  );
}
