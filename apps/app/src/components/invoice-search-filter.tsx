"use client";

import { useInvoiceParams } from "@/hooks/use-invoice-params";
import { useI18n } from "@/locales/client";
import { Calendar } from "@v1/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@v1/ui/dropdown-menu";
import { Icons } from "@v1/ui/icons";
import { Input } from "@v1/ui/input";
import { cn } from "@v1/ui/utils";
import { formatISO } from "date-fns";
import { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { FilterList } from "./filter-list";

const allowedStatuses = [
  "draft",
  "overdue",
  "paid",
  "unpaid",
  "canceled",
] as const;

type Props = {
  customers?: {
    id: string | null;
    name: string | null;
  }[];
};

export function InvoiceSearchFilter({ customers: customersData }: Props) {
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { setParams, statuses, start, end, q, customers } = useInvoiceParams({
    shallow: false,
  });

  const t = useI18n();

  const statusFilters = allowedStatuses.map((status) => ({
    id: status,
    name: t(`invoice_status.${status}` as const),
  }));

  useHotkeys(
    "esc",
    () => {
      setPrompt("");
      setParams({});
      setIsOpen(false);
    },
    {
      enableOnFormTags: true,
    },
  );

  useHotkeys("meta+s", (evt) => {
    evt.preventDefault();
    inputRef.current?.focus();
  });

  useHotkeys("meta+f", (evt) => {
    evt.preventDefault();
    setIsOpen((prev) => !prev);
  });

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    if (value) {
      setPrompt(value);
    } else {
      setParams({});
      setPrompt("");
    }
  };

  const filters = {
    q,
    end,
    start,
    statuses,
    customers,
  };

  const hasValidFilters = Object.values(filters).some(
    (value) => value !== null,
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 items-start sm:items-center w-full">
        <form
          className="relative w-full sm:w-auto"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Icons.Search className="absolute pointer-events-none left-3 top-[11px]" />
          <Input
            ref={inputRef}
            placeholder="Search or filter"
            className="pl-9 w-full sm:w-[350px] pr-8"
            value={prompt}
            onChange={handleSearch}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
          />

          <DropdownMenuTrigger asChild>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              type="button"
              className={cn(
                "absolute z-10 right-3 top-[10px] opacity-50 transition-opacity duration-300 hover:opacity-100",
                hasValidFilters && "opacity-100",
                isOpen && "opacity-100",
              )}
            >
              <Icons.Filter />
            </button>
          </DropdownMenuTrigger>
        </form>

        <FilterList
          filters={filters}
          loading={false}
          onRemove={setParams}
          statusFilters={statusFilters}
          customers={customersData}
        />
      </div>

      <DropdownMenuContent
        className="w-[350px]"
        sideOffset={19}
        alignOffset={-11}
        side="bottom"
        align="end"
      >
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icons.CalendarMonth className="mr-2 h-4 w-4" />
              <span>Due Date</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                sideOffset={14}
                alignOffset={-4}
                className="p-0"
              >
                <Calendar
                  mode="range"
                  initialFocus
                  toDate={new Date()}
                  selected={{
                    from: start ? new Date(start) : undefined,
                    to: end ? new Date(end) : undefined,
                  }}
                  onSelect={(dateRange) => {
                    setParams({
                      start: dateRange?.from
                        ? formatISO(dateRange.from, { representation: "date" })
                        : null,
                      end: dateRange?.to
                        ? formatISO(dateRange.to, { representation: "date" })
                        : null,
                    });
                  }}
                />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icons.Face className="mr-2 h-4 w-4" />
              <span>Customer</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                sideOffset={14}
                alignOffset={-4}
                className="p-0"
              >
                {customersData?.map((customer) => (
                  <DropdownMenuCheckboxItem
                    key={customer.id}
                    onCheckedChange={() => {
                      setParams({
                        customers: filters?.customers?.includes(
                          customer.id ?? "",
                        )
                          ? filters.customers.filter((s) => s !== customer.id)
                          : [...(filters?.customers ?? []), customer.id ?? ""],
                      });
                    }}
                  >
                    {customer.name}
                  </DropdownMenuCheckboxItem>
                ))}

                {!customersData?.length && (
                  <DropdownMenuItem disabled>
                    No customers found
                  </DropdownMenuItem>
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icons.Status className="mr-2 h-4 w-4" />
              <span>Status</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                sideOffset={14}
                alignOffset={-4}
                className="p-0"
              >
                {statusFilters?.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status.id}
                    onCheckedChange={() => {
                      setParams({
                        statuses: filters?.statuses?.includes(status.id)
                          ? filters.statuses.filter((s) => s !== status.id)
                          : [...(filters?.statuses ?? []), status.id],
                      });
                    }}
                  >
                    {status.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
