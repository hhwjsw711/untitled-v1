"use client";

import { cn } from "@v1/ui/utils";
import type { KeyboardEvent } from "react";

export function OpenURL({
  href,
  children,
  className,
}: { href: string; children: React.ReactNode; className?: string }) {
  const handleOnClick = () => {
    window.open(href, "_blank");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter") {
      handleOnClick();
    }
  };

  return (
    <span
      onClick={handleOnClick}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </span>
  );
}
