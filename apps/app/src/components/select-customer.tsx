"use client";

import { useCustomerParams } from "@/hooks/use-customer-params";
import { Button } from "@v1/ui/button";
import React from "react";

export function SelectCustomer() {
  const { setParams: setCustomerParams } = useCustomerParams();

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => setCustomerParams({ createCustomer: true })}
      className="font-mono text-[#434343] p-0 text-[11px] h-auto hover:bg-transparent"
    >
      Select customer
    </Button>
  );
}
