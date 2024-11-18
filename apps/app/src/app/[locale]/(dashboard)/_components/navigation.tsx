"use client";

import { AssistantButton } from "@/components/assistant/button";
import { useAuthActions } from "@convex-dev/auth/react";
import type { api } from "@v1/backend/convex/_generated/api";
import { Button, buttonVariants } from "@v1/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@v1/ui/dropdown-menu";
import { cn } from "@v1/ui/utils";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { LogOut, Settings, Slash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeSwitcher } from "./theme-switcher";

export function Navigation({
  preloadedUser,
}: {
  preloadedUser: Preloaded<typeof api.users.getUser>;
}) {
  const { signOut } = useAuthActions();
  const pathname = usePathname();
  const router = useRouter();
  const isDashboardPath = pathname === "/";
  const isSettingsPath = pathname === "/settings";
  const isBillingPath = pathname === "/settings/billing";
  const isOverviewPath = pathname === "/overview";
  const isInboxPath = pathname === "/inbox";
  const isTransactionsPath = pathname === "/transactions";
  const isInvoicesPath = pathname === "/invoices";
  const isTrackerPath = pathname === "/tracker";
  const isVaultPath = pathname === "/vault";
  const isAppsPath = pathname === "/apps";

  const user = usePreloadedQuery(preloadedUser);

  if (!user) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 flex w-full flex-col border-b border-border px-6">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between py-3">
        <div className="flex h-10 items-center gap-2">
          <Link href="/" className="flex h-10 items-center gap-1">
            <Image src="/logo-v1.png" alt="logo" width={24} height={24} />
          </Link>
          <Slash className="h-6 w-6 -rotate-12 stroke-[1.5px] text-primary/10" />
          <AssistantButton />
        </div>

        <div className="flex h-10 items-center gap-3">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full">
                {user.avatarUrl ? (
                  <img
                    className="min-h-8 min-w-8 rounded-full object-cover"
                    alt={user.name ?? user.email}
                    src={user.avatarUrl}
                  />
                ) : (
                  <span className="min-h-8 min-w-8 rounded-full bg-gradient-to-br from-lime-400 from-10% via-cyan-300 to-blue-500" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={8}
              className="fixed -right-4 min-w-56 bg-card p-2"
            >
              <DropdownMenuItem className="group flex-col items-start focus:bg-transparent">
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-sm font-medium text-primary/80 group-hover:text-primary group-focus:text-primary">
                      {user?.name || ""}
                    </p>
                    <p className="text-sm text-primary/60">{user?.email}</p>
                  </div>
                  <div className="border py-0.5 px-3 rounded-full text-[11px] font-normal">
                    {(user.plan?.key &&
                      user.plan.key.charAt(0).toUpperCase() +
                        user.plan.key.slice(1)) ||
                      "Free"}
                  </div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="group h-9 w-full cursor-pointer justify-between rounded-md px-2"
                onClick={() => router.push("/settings")}
              >
                <span className="text-sm text-primary/60 group-hover:text-primary group-focus:text-primary">
                  Settings
                </span>
                <Settings className="h-[18px] w-[18px] stroke-[1.5px] text-primary/60 group-hover:text-primary group-focus:text-primary" />
              </DropdownMenuItem>

              <DropdownMenuItem
                className={cn(
                  "group flex h-9 justify-between rounded-md px-2 hover:bg-transparent",
                )}
              >
                <span className="w-full text-sm text-primary/60 group-hover:text-primary group-focus:text-primary">
                  Theme
                </span>
                <ThemeSwitcher />
              </DropdownMenuItem>

              <DropdownMenuItem
                className={cn(
                  "group flex h-9 justify-between rounded-md px-2 hover:bg-transparent",
                )}
              >
                <span className="w-full text-sm text-primary/60 group-hover:text-primary group-focus:text-primary">
                  Language
                </span>
                <LanguageSwitcher />
              </DropdownMenuItem>

              <DropdownMenuSeparator className="mx-0 my-2" />

              <DropdownMenuItem
                className="group h-9 w-full cursor-pointer justify-between rounded-md px-2"
                onClick={() => signOut()}
              >
                <span className="text-sm text-primary/60 group-hover:text-primary group-focus:text-primary">
                  Log Out
                </span>
                <LogOut className="h-[18px] w-[18px] stroke-[1.5px] text-primary/60 group-hover:text-primary group-focus:text-primary" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-screen-xl items-center gap-3">
        <div
          className={cn(
            "flex h-12 items-center border-b-2",
            isDashboardPath ? "border-primary" : "border-transparent",
          )}
        >
          <Link
            href="/"
            className={cn(
              `${buttonVariants({ variant: "ghost", size: "sm" })} text-primary/80`,
            )}
          >
            Dashboard
          </Link>
        </div>
        <div
          className={cn(
            "flex h-12 items-center border-b-2",
            isOverviewPath ? "border-primary" : "border-transparent",
          )}
        >
          <Link
            href="/overview"
            className={cn(
              `${buttonVariants({ variant: "ghost", size: "sm" })} text-primary/80`,
            )}
          >
            Overview
          </Link>
        </div>
        <div
          className={cn(
            "flex h-12 items-center border-b-2",
            isInboxPath ? "border-primary" : "border-transparent",
          )}
        >
          <Link
            href="/inbox"
            className={cn(
              `${buttonVariants({ variant: "ghost", size: "sm" })} text-primary/80`,
            )}
          >
            Inbox
          </Link>
        </div>
        <div
          className={cn(
            "flex h-12 items-center border-b-2",
            isTransactionsPath ? "border-primary" : "border-transparent",
          )}
        >
          <Link
            href="/transactions"
            className={cn(
              `${buttonVariants({ variant: "ghost", size: "sm" })} text-primary/80`,
            )}
          >
            Transactions
          </Link>
        </div>
        <div
          className={cn(
            "flex h-12 items-center border-b-2",
            isInvoicesPath ? "border-primary" : "border-transparent",
          )}
        >
          <Link
            href="/invoices"
            className={cn(
              `${buttonVariants({ variant: "ghost", size: "sm" })} text-primary/80`,
            )}
          >
            Invoices
          </Link>
        </div>
        <div
          className={cn(
            "flex h-12 items-center border-b-2",
            isTrackerPath ? "border-primary" : "border-transparent",
          )}
        >
          <Link
            href="/tracker"
            className={cn(
              `${buttonVariants({ variant: "ghost", size: "sm" })} text-primary/80`,
            )}
          >
            Tracker
          </Link>
        </div>
        <div
          className={cn(
            "flex h-12 items-center border-b-2",
            isVaultPath ? "border-primary" : "border-transparent",
          )}
        >
          <Link
            href="/vault"
            className={cn(
              `${buttonVariants({ variant: "ghost", size: "sm" })} text-primary/80`,
            )}
          >
            Vault
          </Link>
        </div>
        <div
          className={cn(
            "flex h-12 items-center border-b-2",
            isAppsPath ? "border-primary" : "border-transparent",
          )}
        >
          <Link
            href="/apps"
            className={cn(
              `${buttonVariants({ variant: "ghost", size: "sm" })} text-primary/80`,
            )}
          >
            Apps
          </Link>
        </div>
        <div
          className={cn(
            "flex h-12 items-center border-b-2",
            isSettingsPath ? "border-primary" : "border-transparent",
          )}
        >
          <Link
            href="/settings"
            className={cn(
              `${buttonVariants({ variant: "ghost", size: "sm" })} text-primary/80`,
            )}
          >
            Settings
          </Link>
        </div>
        <div
          className={cn(
            "flex h-12 items-center border-b-2",
            isBillingPath ? "border-primary" : "border-transparent",
          )}
        >
          <Link
            href="/settings/billing"
            className={cn(
              `${buttonVariants({ variant: "ghost", size: "sm" })} text-primary/80`,
            )}
          >
            Billing
          </Link>
        </div>
      </div>
    </nav>
  );
}
