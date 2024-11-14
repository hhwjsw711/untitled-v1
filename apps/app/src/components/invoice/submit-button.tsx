"use client";

import type { InvoiceFormValues } from "@/actions/invoice/schema";
import { Button } from "@v1/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@v1/ui/dropdown-menu";
import { Icons } from "@v1/ui/icons";
import { SubmitButton as BaseSubmitButton } from "@v1/ui/submit-button";
import { useFormContext } from "react-hook-form";

export function SubmitButton() {
  const { watch, setValue, formState } = useFormContext<InvoiceFormValues>();

  const selectedOption = watch("template.delivery_type");
  const canUpdate = watch("status") !== "draft";

  const invoiceNumberValid = !formState.errors.invoice_number;

  const handleOptionChange = (value: string) => {
    const deliveryType = value as "create" | "create_and_send";

    setValue("template.delivery_type", deliveryType, {
      shouldValidate: true,
    });
  };

  const isValid = formState.isValid && invoiceNumberValid;

  const options = [
    {
      label: canUpdate ? "Update" : "Create",
      value: "create",
    },
    {
      label: canUpdate ? "Update & Send" : "Create & Send",
      value: "create_and_send",
    },
  ];

  return (
    <div className="flex divide-x">
      <BaseSubmitButton isSubmitting={false} disabled={!isValid}>
        {options.find((o) => o.value === selectedOption)?.label}
      </BaseSubmitButton>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={!isValid}
            className="size-9 p-0 [&[data-state=open]>svg]:rotate-180"
          >
            <Icons.ChevronDown className="size-4 transition-transform duration-200" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={10}>
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={selectedOption === option.value}
              onCheckedChange={() => handleOptionChange(option.value)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
