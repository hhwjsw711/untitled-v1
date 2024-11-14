"use client";

import type { InvoiceFormValues } from "@/actions/invoice/schema";
import { formatAmount } from "@/utils/format";
import { calculateLineItemTotal } from "@v1/invoice/calculate";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { Reorder, useDragControls } from "framer-motion";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { AmountInput } from "./amount-input";
import { Description } from "./description";
import { LabelInput } from "./label-input";
import { QuantityInput } from "./quantity-input";

export function LineItems() {
  const { control } = useFormContext<InvoiceFormValues>();
  const currency = useWatch({ control, name: "template.currency" });
  const includeDecimals = useWatch({
    control,
    name: "template.include_decimals",
  });

  const maximumFractionDigits = includeDecimals ? 2 : 0;

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "line_items",
  });

  const reorderList = (newFields: typeof fields) => {
    const firstDiffIndex = fields.findIndex(
      (field, index) => field.id !== newFields[index]?.id,
    );

    if (firstDiffIndex !== -1) {
      const newIndex = newFields.findIndex(
        (field) => field.id === fields[firstDiffIndex]?.id,
      );

      if (newIndex !== -1) {
        swap(firstDiffIndex, newIndex);
      }
    }
  };

  const handleRemove = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[1.5fr_15%_15%_15%] gap-4 items-end mb-2">
        <LabelInput name="template.description_label" className="truncate" />

        <LabelInput name="template.quantity_label" className="truncate" />

        <LabelInput name="template.price_label" className="truncate" />

        <LabelInput
          name="template.total_label"
          className="text-right truncate"
        />
      </div>

      <Reorder.Group
        axis="y"
        values={fields}
        onReorder={reorderList}
        className="!m-0"
      >
        {fields.map((field, index) => (
          <LineItemRow
            key={field.id}
            item={field}
            index={index}
            handleRemove={handleRemove}
            isReorderable={fields.length > 1}
            currency={currency}
            maximumFractionDigits={maximumFractionDigits}
          />
        ))}
      </Reorder.Group>

      <button
        type="button"
        onClick={() =>
          append({
            name: "",
            quantity: 0,
            price: 0,
          })
        }
        className="flex items-center space-x-2 text-xs text-[#878787] font-mono"
      >
        <Icons.Add />
        <span className="text-[11px]">Add item</span>
      </button>
    </div>
  );
}

function LineItemRow({
  index,
  handleRemove,
  isReorderable,
  item,
  currency,
  maximumFractionDigits,
}: {
  index: number;
  handleRemove: (index: number) => void;
  isReorderable: boolean;
  item: InvoiceFormValues["line_items"][number];
  currency: string;
  maximumFractionDigits: number;
}) {
  const controls = useDragControls();
  const { control } = useFormContext<InvoiceFormValues>();

  const price = useWatch({
    control,
    name: `line_items.${index}.price`,
  });

  const quantity = useWatch({
    control,
    name: `line_items.${index}.quantity`,
  });

  return (
    <Reorder.Item
      className="grid grid-cols-[1.5fr_15%_15%_15%] gap-4 items-start relative group mb-2 w-full"
      value={item}
      dragListener={false}
      dragControls={controls}
    >
      {isReorderable && (
        <Button
          type="button"
          className="absolute -left-9 -top-[4px] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-transparent cursor-grab"
          onPointerDown={(e) => controls.start(e)}
          variant="ghost"
        >
          <Icons.DragIndicator className="size-4 text-[#878787]" />
        </Button>
      )}

      <Description name={`line_items.${index}.name`} />

      <QuantityInput name={`line_items.${index}.quantity`} />

      <AmountInput name={`line_items.${index}.price`} />

      <div className="text-right">
        <span className="text-xs text-primary font-mono">
          {formatAmount({
            amount: calculateLineItemTotal({
              price,
              quantity,
            }),
            currency,
            maximumFractionDigits,
          })}
        </span>
      </div>

      {index !== 0 && (
        <Button
          type="button"
          onClick={() => handleRemove(index)}
          className="absolute -right-9 -top-[4px] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-transparent text-[#878787]"
          variant="ghost"
        >
          <Icons.Close />
        </Button>
      )}
    </Reorder.Item>
  );
}