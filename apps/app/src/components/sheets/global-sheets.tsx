import { Suspense } from "react";
import { InvoiceCreateSheetServer } from "./invoice-create-sheet.server";

export async function GlobalSheets() {
  return (
    <>
      <Suspense fallback={null}>
        {/* We preload the invoice data (template, invoice number etc) */}
        <InvoiceCreateSheetServer />
      </Suspense>
    </>
  );
}
