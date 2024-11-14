"use client";

import { SheetContent, SheetHeader } from "@v1/ui/sheet";
import { useFormContext } from "react-hook-form";
import { Form } from "../invoice/form";
import { SettingsMenu } from "../invoice/settings-menu";

export function InvoiceSheetContent() {
  const { watch } = useFormContext();
  const templateSize = watch("template.size");

  const size = templateSize === "a4" ? 650 : 740;

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

      <Form />
    </SheetContent>
  );
}
