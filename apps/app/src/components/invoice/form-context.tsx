"use client";

import {
  type InvoiceFormValues,
  type InvoiceTemplate,
  invoiceFormSchema,
} from "@/actions/invoice/schema";
import { useInvoiceParams } from "@/hooks/use-invoice-params";
import { UTCDate } from "@date-fns/utc";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMonths } from "date-fns";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

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
  total_summary_label: "Total",
  subtotal_label: "Subtotal",
  vat_label: "VAT",
  tax_label: "Tax",
  payment_label: "Payment Details",
  payment_details: undefined,
  note_label: "Note",
  logo_url: undefined,
  currency: "USD",
  from_details: undefined,
  size: "a4",
  include_vat: true,
  include_tax: true,
  discount_label: "Discount",
  include_discount: false,
  include_decimals: false,
  include_qr: true,
  date_format: "dd/MM/yyyy",
  tax_rate: 0,
  vat_rate: 0,
  delivery_type: "create",
};

type FormContextProps = {
  id?: string | null;
  children: React.ReactNode;
  isOpen: boolean;
};

export function FormContext({ id, children, isOpen }: FormContextProps) {
  const { lineItems, currency } = useInvoiceParams();

  const defaultValues = {
    id: uuidv4(),
    template: {
      ...defaultTemplate,
    },
    customer_details: undefined,
    note_details: undefined,
    customer_id: undefined,
    issue_date: new UTCDate(),
    due_date: addMonths(new UTCDate(), 1),
    line_items: [{ name: "", quantity: 0, price: 0, vat: 0 }],
    tax: undefined,
    token: undefined,
    discount: undefined,
    subtotal: undefined,
    status: "draft",
    top_block: undefined,
    bottom_block: undefined,
  };

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset({
        ...defaultValues,
        template: {
          ...defaultValues.template,
          locale: navigator.language,
        },
      });
    }
  }, [isOpen]);

  // These values comes from the tracker table
  useEffect(() => {
    if (lineItems) {
      form.setValue("line_items", [lineItems]);
    }
  }, [lineItems]);

  useEffect(() => {
    if (currency) {
      form.setValue("template.currency", currency);
    }
  }, [currency]);

  return <FormProvider {...form}>{children}</FormProvider>;
}
