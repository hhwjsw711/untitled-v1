import { Suspense } from "react";
import { CustomerCreateSheet } from "./customer-create-sheet";
import { InvoiceCreateSheetServer } from "./invoice-create-sheet.server";

export async function GlobalSheets() {
  return (
    <>
      <CustomerCreateSheet />

      <Suspense fallback={null}>
        {/* We preload the invoice data (template, invoice number etc) */}
        <InvoiceCreateSheetServer />
      </Suspense>
    </>
  );
}
