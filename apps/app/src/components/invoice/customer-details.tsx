"use client";

import { Editor } from "@/components/invoice/editor";
import { useInvoiceParams } from "@/hooks/use-invoice-params";
import type { JSONContent } from "@tiptap/react";
import { Controller, useFormContext } from "react-hook-form";
import { LabelInput } from "./label-input";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address_line_1?: string;
  address_line_2?: string;
  token: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  vat?: string;
}

export function CustomerDetails() {
  const { control, setValue, watch } = useFormContext();
  const { setParams, selectedCustomerId } = useInvoiceParams();

  const id = watch("id");

  const handleOnChange = (content?: JSONContent | null) => {
    // Reset the selected customer id when the content is changed
    setParams({ selectedCustomerId: null });

    setValue("customer_details", content, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (!content) {
      setValue("customer_name", null, { shouldValidate: true });
      setValue("customer_id", null, { shouldValidate: true });
    }
  };

  return (
    <div>
      <LabelInput name="template.customer_label" className="mb-2 block" />
      {
        <Controller
          name="customer_details"
          control={control}
          render={({ field }) => (
            <Editor
              // NOTE: This is a workaround to get the new content to render
              key={id}
              initialContent={field.value}
              onChange={handleOnChange}
              className="min-h-[90px]"
            />
          )}
        />
      }
    </div>
  );
}
