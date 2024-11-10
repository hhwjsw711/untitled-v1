"use client";

import { Button } from "@v1/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@v1/ui/dialog";
import { Icons } from "@v1/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@v1/ui/tooltip";
import { cn } from "@v1/ui/utils";
import { usePathname } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { FaXTwitter } from "react-icons/fa6";
import { CopyInput } from "./copy-input";

const popupCenter = ({
  url,
  title,
  w,
  h,
}: { url: string; title: string; w: number; h: number }) => {
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `,
  );

  return newWindow;
};

export function UpdatesToolbar({
  posts,
}: { posts: { slug: string; title: string }[] }) {
  const pathname = usePathname();
  const currentIndex = posts.findIndex((a) => pathname.endsWith(a.slug)) ?? 0;

  const currentPost = posts[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevPost = posts[currentIndex - 1];
      const element = document.getElementById(`article-${prevPost?.slug}`);
      if (element) {
        const headerOffset = 80;
        const targetPosition = element.offsetTop - headerOffset;
        console.log("Simple scroll (prev):", {
          targetSlug: prevPost?.slug,
          elementOffset: element.offsetTop,
          headerOffset,
          targetPosition,
        });
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
        const newUrl = `/updates/${prevPost?.slug}`;
        window.history.pushState({}, "", newUrl);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex !== posts.length - 1) {
      const nextPost = posts[currentIndex + 1];
      const element = document.getElementById(`article-${nextPost?.slug}`);
      if (element) {
        const headerOffset = 80;
        const targetPosition = element.offsetTop - headerOffset;
        console.log("Simple scroll (next):", {
          targetSlug: nextPost?.slug,
          elementOffset: element.offsetTop,
          headerOffset,
          targetPosition,
        });
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
        const newUrl = `/updates/${nextPost?.slug}`;
        window.history.pushState({}, "", newUrl);
      }
    }
  };

  useHotkeys("arrowRight", () => handleNext(), [handleNext]);
  useHotkeys("arrowLeft", () => handlePrev(), [handlePrev]);

  const handleOnShare = () => {
    if (!currentPost) return;

    const popup = popupCenter({
      url: `https://twitter.com/intent/tweet?text=${currentPost.title} https://midday.ai/updates/${currentPost.slug}`,
      title: currentPost.title,
      w: 800,
      h: 400,
    });

    popup?.focus();
  };

  return (
    <Dialog>
      <div className="fixed right-6 bottom-0 top-0 flex-col items-center justify-center hidden md:flex">
        <TooltipProvider delayDuration={20}>
          <div className="flex flex-col items-center backdrop-filter backdrop-blur-lg bg-[#1A1A1A]/80 p-2 border border-[#2C2C2C] space-y-4 rounded-full">
            <Tooltip>
              <TooltipTrigger>
                <DialogTrigger asChild>
                  <Icons.Share size={18} className="text-[#606060] -mt-[1px]" />
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent
                className="py-1 px-3 rounded-sm"
                sideOffset={25}
                side="right"
              >
                <span className="text-xs">Share</span>
              </TooltipContent>
            </Tooltip>

            <div className="flex flex-col items-center border-t-[1px] border-border space-y-2 pt-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(currentIndex === 0 && "opacity-50")}
                    onClick={handlePrev}
                  >
                    <Icons.ChevronUp className="h-6 w-6" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  className="py-1 px-3 rounded-sm"
                  sideOffset={25}
                  side="right"
                >
                  <span className="text-xs">Previous post</span>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      currentIndex === posts.length - 1 && "opacity-50",
                    )}
                    onClick={handleNext}
                  >
                    <Icons.ChevronDown className="h-6 w-6" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  className="py-1 px-3 rounded-sm"
                  sideOffset={25}
                  side="right"
                >
                  <span className="text-xs">Next post</span>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <CopyInput value={`https://midday.ai${pathname}`} />
            <Button
              className="w-full flex items-center space-x-2 h-10"
              onClick={handleOnShare}
            >
              <span>Share on</span>
              <FaXTwitter />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
