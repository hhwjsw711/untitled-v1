"use client";

import { cn } from "@v1/ui/utils";

interface Message {
  id: string;
  display: React.ReactNode;
}

type Props = {
  messages: Message[];
  className?: string;
};

export function ChatList({ messages, className }: Props) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-col select-text", className)}>
      {messages
        .filter((tool) => tool.display !== undefined)
        .map((message, index) => (
          <div key={message.id}>
            {message.display}
            {index < messages.length - 1 && <div className="my-6" />}
          </div>
        ))}
    </div>
  );
}
