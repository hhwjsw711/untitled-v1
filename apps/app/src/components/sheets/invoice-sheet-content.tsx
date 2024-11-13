"use client";

import { useInvoiceParams } from "@/hooks/use-invoice-params";
import { Button } from "@v1/ui/button";
import { SheetContent, SheetHeader } from "@v1/ui/sheet";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { SettingsMenu } from "../invoice/settings-menu";
import { OpenURL } from "../open-url";
import type { Invoice } from "../tables/invoices/columns";

function InvoiceSheetHeader({
  type,
}: { type: "created" | "created_and_sent" }) {
  if (type === "created") {
    return (
      <SheetHeader className="mb-6 flex flex-col">
        <h2 className="text-xl">Created</h2>
        <p className="text-sm text-[#808080]">
          Your invoice was created successfully
        </p>
      </SheetHeader>
    );
  }

  if (type === "created_and_sent") {
    return (
      <SheetHeader className="mb-6 flex flex-col">
        <h2 className="text-xl">Created & Sent</h2>
        <p className="text-sm text-[#808080]">
          Your invoice was created and sent successfully
        </p>
      </SheetHeader>
    );
  }

  return null;
}

export function InvoiceSheetContent() {
  const { setParams, type } = useInvoiceParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  const { watch } = useFormContext();
  const templateSize = watch("template.size");

  const size = templateSize === "a4" ? 650 : 740;
  const isOpen = Boolean(type === "create" || type === "edit");

  useEffect(() => {
    setInvoice(null);
  }, [isOpen]);

  if (invoice && invoice.status !== "draft") {
    return (
      <SheetContent className="bg-white dark:bg-[#0C0C0C] transition-[max-width] duration-300 ease-in-out">
        <div className="flex mt-auto absolute bottom-6 justify-end gap-4 right-6 left-6">
          <OpenURL href={`/i/${invoice.token}`}>
            <Button variant="secondary">View invoice</Button>
          </OpenURL>

          <Button
            onClick={() => {
              setInvoice(null);
              setParams({}, { shallow: false });

              setTimeout(() => {
                setParams({ type: "create" });
              }, 600);
            }}
          >
            Create another
          </Button>
        </div>
      </SheetContent>
    );
  }

  return (
    <SheetContent
      style={{ maxWidth: size }}
      className="bg-white dark:bg-[#0C0C0C] transition-[max-width] duration-300 ease-in-out"
    >
      <SheetHeader className="mb-6 flex justify-between items-center flex-row">
        <div className="ml-auto">
          <SettingsMenu />
        </div>
      </SheetHeader>
    </SheetContent>
  );
}
