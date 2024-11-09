"use client";

import { useEnterSubmit } from "@/hooks/use-enter-submit";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { useAssistantStore } from "@/store/assistant";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Textarea } from "@v1/ui/textarea";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import { ChatEmpty } from "./chat-empty";
import { ChatExamples } from "./chat-examples";
import { ChatFooter } from "./chat-footer";
import { ChatList } from "./chat-list";
import { chatExamples } from "./examples";
import { BotCard, SignUpCard, UserMessage } from "./messages";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  display: React.ReactNode;
}

interface ChatProps {
  messages: ChatMessage[];
  submitMessage: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onNewChat: () => void;
  input: string;
  setInput: (value: string) => void;
}

export function Chat({
  messages,
  submitMessage,
  onNewChat,
  input,
  setInput,
}: ChatProps) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const ref = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { message } = useAssistantStore();

  const onSubmit = async (input: string) => {
    const value = input.trim();

    if (value.length === 0) {
      return null;
    }

    setInput("");
    scrollToBottom();

    submitMessage((messages: ChatMessage[]) => [
      ...messages,
      {
        id: nanoid(),
        role: "user",
        display: <UserMessage>{value}</UserMessage>,
      },
    ]);

    const content = chatExamples.find(
      (example) => example.title === input,
    )?.content;
    if (content) {
      setTimeout(
        () =>
          submitMessage((message: ChatMessage[]) => [
            ...message,
            {
              id: nanoid(),
              role: "assistant",
              display: (
                <BotCard
                  content={
                    chatExamples.find((example) => example.title === input)!
                      .content
                  }
                />
              ),
            },
          ]),
        500,
      );
    } else {
      setTimeout(
        () =>
          submitMessage((message: ChatMessage[]) => [
            ...message,
            {
              id: nanoid(),
              role: "assistant",
              display: <SignUpCard />,
            },
          ]),
        200,
      );
    }
  };

  useEffect(() => {
    if (!ref.current && message) {
      onNewChat();
      onSubmit(message);
      ref.current = true;
    }
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef?.current?.focus();
    });
  }, [messages]);

  const { messagesRef, scrollRef, visibilityRef, scrollToBottom } =
    useScrollAnchor();

  const showExamples = messages.length === 0 && !input;

  return (
    <div className="relative">
      <ScrollArea className="todesktop:h-[335px] md:h-[335px]" ref={scrollRef}>
        <div ref={messagesRef}>
          {messages.length ? (
            <ChatList messages={messages} className="p-4 pb-8" />
          ) : (
            <ChatEmpty />
          )}

          <div className="w-full h-px" ref={visibilityRef} />
        </div>
      </ScrollArea>

      <div className="fixed bottom-[1px] left-[1px] right-[1px] todesktop:h-[88px] md:h-[88px] bg-background border-border border-t-[1px]">
        {showExamples && <ChatExamples onSubmit={onSubmit} />}

        <form
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault();
            onSubmit(input);
          }}
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            rows={1}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            value={input}
            className="h-12 min-h-12 pt-3 resize-none border-none focus-visible:ring-0"
            placeholder="Ask Uno a question..."
            onKeyDown={onKeyDown}
            onChange={(evt) => {
              setInput(evt.target.value);
            }}
          />
        </form>

        <ChatFooter onSubmit={() => onSubmit(input)} />
      </div>
    </div>
  );
}
