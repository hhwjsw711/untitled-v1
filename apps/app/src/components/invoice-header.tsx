import { InvoiceSearchFilter } from "@/components/invoice-search-filter";
import { OpenInvoiceSheet } from "./open-invoice-sheet";

export async function InvoiceHeader() {
  return (
    <div className="flex items-center justify-between w-full gap-4">
      <div className="flex-1">
        <InvoiceSearchFilter />
      </div>

      <div className="hidden sm:block shrink-0">
        <OpenInvoiceSheet />
      </div>
    </div>
  );
}
