"use client";

import { Chat } from "@/components/chat";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { chatExamples } from "../chat/examples";
import { BotCard, UserMessage } from "../chat/messages";
import { Header } from "./header";
import { SidebarList } from "./sidebar-list";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  display: React.ReactNode;
}

export function Assistant() {
  const [isExpanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");

  const toggleOpen = () => setExpanded((prev) => !prev);

  const onNewChat = () => {
    setInput("");
    setExpanded(false);
    setMessages([]);
  };

  const handleOnSelect = (message: string) => {
    const content = chatExamples.find(
      (example) => example.title === message,
    )?.content;

    setExpanded(false);

    if (content) {
      setMessages([
        {
          id: nanoid(),
          role: "user",
          display: <UserMessage>{message}</UserMessage>,
        },
        {
          id: nanoid(),
          role: "assistant",
          display: <BotCard content={content} />,
        },
      ]);
    }
  };

  useHotkeys("meta+j", () => onNewChat(), {
    enableOnFormTags: true,
  });

  return (
    <div className="overflow-hidden p-0 h-full w-full todesktop:max-w-[760px] md:max-w-[760px] md:h-[480px] todesktop:h-[480px]">
      <SidebarList
        onNewChat={onNewChat}
        isExpanded={isExpanded}
        setExpanded={setExpanded}
        onSelect={handleOnSelect}
      />

      <Header toggleSidebar={toggleOpen} isExpanded={isExpanded} />

      <Chat
        submitMessage={setMessages}
        messages={messages}
        onNewChat={onNewChat}
        setInput={setInput}
        input={input}
      />
    </div>
  );
}
