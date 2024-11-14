"use client";

import { Editor } from "@/components/invoice/editor";
import { Controller, useFormContext } from "react-hook-form";
import { LabelInput } from "./label-input";

export function PaymentDetails() {
  const { control, watch } = useFormContext();
  const id = watch("id");

  return (
    <div>
      <LabelInput name="template.payment_label" className="mb-2 block" />

      <Controller
        control={control}
        name="payment_details"
        render={({ field }) => (
          <Editor
            // NOTE: This is a workaround to get the new content to render
            key={id}
            initialContent={field.value}
            onChange={field.onChange}
            className="min-h-[78px]"
          />
        )}
      />
    </div>
  );
}
