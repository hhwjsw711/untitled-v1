"use client";

import { Button } from "@v1/ui/button";
import { cn } from "@v1/ui/utils";
import { motion } from "framer-motion";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { useEffect, useState } from "react";
import { ErrorFallback } from "../error-fallback";
import { ChatAvatar } from "./chat-avatar";
import { spinner } from "./spinner";

function getRandomDelay(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function concatCharacter(
  inputString: string,
  callback: (result: string) => void,
) {
  const words = inputString.split(" ");
  let result = "";
  for (let i = 0; i < words.length; i++) {
    result += (i > 0 ? " " : "") + words[i];
    await new Promise((resolve) =>
      setTimeout(resolve, getRandomDelay(70, 100)),
    );
    callback(result); // Call the callback with the intermediate result
  }
}

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex items-start">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center">
        <ChatAvatar type="user" />
      </div>

      <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2 text-xs font-mono leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center">
        <ChatAvatar type="assistant" />
      </div>

      <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
        {spinner}
      </div>
    </div>
  );
}

export function BotCard({
  content,
  showAvatar = true,
  className,
}: {
  content: string;
  showAvatar?: boolean;
  className?: string;
}) {
  const [text, setText] = useState<string>();

  useEffect(() => {
    concatCharacter(content, (intermediateResult) => {
      setText(intermediateResult);
    });
  }, [content]);

  return (
    <ErrorBoundary errorComponent={ErrorFallback}>
      <div className="group relative flex items-start">
        <div className="flex size-[25px] shrink-0 select-none items-center justify-center">
          {showAvatar && <ChatAvatar type="assistant" />}
        </div>

        <div
          className={cn(
            "ml-4 flex-1 space-y-2 overflow-hidden pl-2 text-xs font-mono leading-relaxed",
            className,
          )}
        >
          {text}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export function SignUpCard({
  showAvatar = true,
  className,
}: {
  showAvatar?: boolean;
  className?: string;
}) {
  const [text, setText] = useState<string>();
  const content =
    "I'm just a demo assistant. To ask questions about your business, you can sign up and get started in a matter of minutes.";
  useEffect(() => {
    concatCharacter(content, (intermediateResult) => {
      setText(intermediateResult);
    });
  }, []);
  return (
    <div>
      <div className="group relative flex items-start">
        <div className="flex size-[25px] shrink-0 select-none items-center justify-center">
          {showAvatar && <ChatAvatar type="assistant" />}
        </div>
        <div
          className={cn(
            "ml-4 flex-1 space-y-2 overflow-hidden pl-2 text-xs font-mono leading-relaxed",
            className,
          )}
        >
          {text}
        </div>
      </div>
      <motion.div
        className="ml-12 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.2 }}
      >
        <a href="https://untitled.uno">
          <Button>Sign up</Button>
        </a>
      </motion.div>
    </div>
  );
}
