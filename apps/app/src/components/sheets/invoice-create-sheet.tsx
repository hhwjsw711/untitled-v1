"use client";

import type { InvoiceTemplate } from "@/actions/invoice/schema";
import { useInvoiceParams } from "@/hooks/use-invoice-params";
import { Sheet } from "@v1/ui/sheet";
import React from "react";
import { FormContext } from "../invoice/form-context";
import { InvoiceSheetContent } from "./invoice-sheet-content";

export function InvoiceCreateSheet() {
  const { setParams, type, invoiceId } = useInvoiceParams();
  const isOpen = Boolean(type === "create" || type === "edit");

  const defaultTemplate: InvoiceTemplate = {
    title: "Invoice",
    customer_label: "To",
    from_label: "From",
    invoice_no_label: "Invoice No",
    issue_date_label: "Issue Date",
    due_date_label: "Due Date",
    description_label: "Description",
    price_label: "Price",
    quantity_label: "Quantity",
    total_label: "Total",
    payment_label: "Payment Details",
    note_label: "Note",
    currency: "USD",
    size: "a4",
    date_format: "dd/MM/yyyy",
    delivery_type: "create",
  };

  return (
    <FormContext
      isOpen={isOpen}
      id={invoiceId}
      template={defaultTemplate}
      invoiceNumber="INV-001"
    >
      <Sheet open={isOpen} onOpenChange={() => setParams({ type: null })}>
        <InvoiceSheetContent />
      </Sheet>
    </FormContext>
  );
}
