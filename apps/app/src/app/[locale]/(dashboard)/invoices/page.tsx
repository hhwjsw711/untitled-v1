import { InvoiceHeader } from "@/components/invoice-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoices | Midday",
};

export default async function Page() {
  return (
    <div className="flex flex-col gap-6">
      <InvoiceHeader />
    </div>
  );
}
