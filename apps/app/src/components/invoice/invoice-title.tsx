"use client";

import { Input } from "./input";

export function InvoiceTitle() {
  return (
    <Input
      className="text-[21px] font-medium mb-2 w-fit min-w-[100px] !border-none"
      name="template.title"
    />
  );
}
