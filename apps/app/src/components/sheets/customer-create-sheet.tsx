"use client";

import { useCustomerParams } from "@/hooks/use-customer-params";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { Sheet, SheetContent, SheetHeader } from "@v1/ui/sheet";
import React from "react";
import { CustomerForm } from "../forms/customer-form";

export function CustomerCreateSheet() {
  const { setParams, createCustomer } = useCustomerParams();

  const isOpen = Boolean(createCustomer);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => setParams({ createCustomer: null })}
    >
      <SheetContent stack>
        <SheetHeader className="mb-6 flex justify-between items-center flex-row">
          <h2 className="text-xl">Create Customer</h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setParams({ createCustomer: null })}
            className="p-0 m-0 size-auto hover:bg-transparent"
          >
            <Icons.Close className="size-5" />
          </Button>
        </SheetHeader>

        <CustomerForm />
      </SheetContent>
    </Sheet>
  );
}
