"use client";

import { useInvoiceParams } from "@/hooks/use-invoice-params";
import { Sheet } from "@v1/ui/sheet";
import React from "react";
import { FormContext } from "../invoice/form-context";
import { InvoiceSheetContent } from "./invoice-sheet-content";

export function InvoiceCreateSheet() {
  const { setParams, type, invoiceId } = useInvoiceParams();
  const isOpen = Boolean(type === "create" || type === "edit");

  return (
    <FormContext isOpen={isOpen} id={invoiceId}>
      <Sheet open={isOpen} onOpenChange={() => setParams({ type: null })}>
        <InvoiceSheetContent />
      </Sheet>
    </FormContext>
  );
}
