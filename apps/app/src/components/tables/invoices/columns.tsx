"use client";

import { FormatAmount } from "@/components/format-amount";
import { InvoiceStatus } from "@/components/invoice-status";
import { useInvoiceParams } from "@/hooks/use-invoice-params";
import { formatDate, getDueDateStatus } from "@/utils/format";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImageNext } from "@v1/ui/avatar";
import { Button } from "@v1/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@v1/ui/dropdown-menu";
import { Icons } from "@v1/ui/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { TooltipProvider } from "@v1/ui/tooltip";
import { useToast } from "@v1/ui/use-toast";
import { cn } from "@v1/ui/utils";
import { formatDistanceToNow } from "date-fns";
import * as React from "react";

export type Invoice = {
  id: string;
  due_date: string;
  issue_date?: string;
  paid_at?: string;
  status: string;
  currency: string;
  invoice_number: string;
  amount?: number;
  vat?: number;
  tax?: number;
  updated_at?: string;
  viewed_at?: string;
  token: string;
  sent_to?: string | null;
  customer_details?: JSON;
  internal_note?: string | null;
  customer?: {
    id: string;
    name: string;
    website: string;
  };
  // Used when relation is deleted
  customer_name?: string;
};

export const columns: ColumnDef<Invoice>[] = [
  {
    header: "Due date",
    accessorKey: "due_date",
    cell: ({ row }) => {
      const date = row.getValue("due_date") as string;

      const showDate =
        row.original.status === "unpaid" ||
        row.original.status === "overdue" ||
        row.original.status === "pending";

      return (
        <div className="flex flex-col space-y-1 w-[80px]">
          <span>{date ? formatDate(date) : "-"}</span>
          {showDate && (
            <span className="text-xs text-muted-foreground">
              {date ? getDueDateStatus(date) : "-"}
            </span>
          )}
        </div>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => <InvoiceStatus status={row.getValue("status")} />,
  },
  {
    header: "Customer",
    accessorKey: "customer",
    cell: ({ row }) => {
      const customer = row.original.customer;
      const name = customer?.name || row.original.customer_name;
      const viewAt = row.original.viewed_at;

      if (!name) return "-";

      return (
        <div className="flex items-center space-x-2">
          <Avatar className="size-5">
            {customer?.website && (
              <AvatarImageNext
                src={`https://img.logo.dev/${customer?.website}?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ&size=60`}
                alt={`${name} logo`}
                width={20}
                height={20}
                quality={100}
              />
            )}
            <AvatarFallback className="text-[9px] font-medium">
              {name?.[0]}
            </AvatarFallback>
          </Avatar>
          <span className="truncate">{name}</span>

          {viewAt && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger className="flex items-center space-x-2">
                  <Icons.Visibility className="size-4 text-[#878787]" />
                </TooltipTrigger>
                <TooltipContent
                  className="text-xs py-1 px-2"
                  side="right"
                  sideOffset={5}
                >
                  {`Viewed ${formatDistanceToNow(viewAt)} ago`}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => (
      <span
        className={cn({
          "line-through": row.original.status === "canceled",
        })}
      >
        <FormatAmount
          amount={row.getValue("amount")}
          currency={row.original.currency}
        />
      </span>
    ),
  },
  {
    header: "Invoice no.",
    accessorKey: "invoice_number",
    cell: ({ row }) => row.getValue("invoice_number"),
  },
  {
    header: "Issue date",
    accessorKey: "issue_date",
    cell: ({ row }) => {
      const date = row.getValue("issue_date") as string;
      return <span>{date ? formatDate(date) : "-"}</span>;
    },
  },
  {
    header: "Recurring",
    accessorKey: "recurring",
    cell: ({ row }) => row.getValue("recurring") ?? "One time",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const status = row.getValue("status");
      const { setParams } = useInvoiceParams();
      const { toast } = useToast();

      const handleCopyLink = async () => {
        try {
          await navigator.clipboard.writeText(
            `${window.location.origin}/i/${row.original.token}`,
          );

          toast({
            duration: 4000,
            title: "Copied link to clipboard.",
            variant: "default",
          });
        } catch {}
      };

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="relative">
              <Button variant="ghost" className="h-8 w-8 p-0">
                {/* {hasNewMessages && (
                  <div className="rounded-full size-1 absolute bg-[#FFD02B] -right-0 top-0.5 ring-2 ring-background">
                    <div className="absolute inset-0 rounded-full bg-[#FFD02B] animate-[ping_1s_ease-in-out_5]" />
                    <div className="absolute inset-0 rounded-full bg-[#FFD02B] animate-[pulse_1s_ease-in-out_5] opacity-75" />
                    <div className="absolute inset-0 rounded-full bg-[#FFD02B] animate-[pulse_1s_ease-in-out_5] opacity-50" />
                  </div>
                )} */}
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {status !== "paid" && status !== "canceled" && (
                <DropdownMenuItem
                  onClick={() =>
                    setParams({
                      invoiceId: row.original.id,
                      type: "edit",
                    })
                  }
                >
                  Edit invoice
                </DropdownMenuItem>
              )}

              <DropdownMenuItem onClick={handleCopyLink}>
                Copy link
              </DropdownMenuItem>

              {status !== "draft" && (
                <>
                  {/* <DropdownMenuItem
                    onClick={() =>
                      setParams({
                        type: "comments",
                        invoiceId: row.original.id,
                      })
                    }
                  >
                    Comments
                  </DropdownMenuItem> */}
                  <DropdownMenuItem>Download</DropdownMenuItem>
                </>
              )}

              {(status === "overdue" || status === "unpaid") && (
                <DropdownMenuItem className="text-[#FF3638]">
                  Cancel
                </DropdownMenuItem>
              )}

              {status === "canceled" && (
                <DropdownMenuItem className="text-[#FF3638]">
                  Delete
                </DropdownMenuItem>
              )}

              {status === "draft" && (
                <DropdownMenuItem className="text-[#FF3638]">
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];