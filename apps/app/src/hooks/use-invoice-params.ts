import type { lineItemSchema } from "@/actions/invoice/schema";
import {
  parseAsArrayOf,
  parseAsJson,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";

import type { z } from "zod";

export function useInvoiceParams(options?: { shallow: boolean }) {
  const [params, setParams] = useQueryStates(
    {
      invoiceId: parseAsString,
      sort: parseAsArrayOf(parseAsString),
      q: parseAsString,
      statuses: parseAsArrayOf(parseAsString),
      customers: parseAsArrayOf(parseAsString),
      start: parseAsString,
      end: parseAsString,
      selectedCustomerId: parseAsString,
      type: parseAsStringEnum(["edit", "create", "details", "comments"]),
      lineItems: parseAsJson<z.infer<typeof lineItemSchema>>(),
      currency: parseAsString,
    },
    options,
  );

  return {
    ...params,
    setParams,
  };
}
