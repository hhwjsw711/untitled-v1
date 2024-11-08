import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@v1/ui/tooltip";
import Image from "next/image";
import footerWechat from "public/footer-wechat.jpg";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn, FaProductHunt, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { SiWechat } from "react-icons/si";

export function SocialLinks() {
  return (
    <ul className="flex space-x-4 items-center md:ml-5">
      <li>
        <a target="_blank" rel="noreferrer" href="https://x.com/hhwjsw711">
          <span className="sr-only">Twitter</span>
          <FaXTwitter size={22} className="fill-[#878787]" />
        </a>
      </li>
      <li>
        <a target="_blank" rel="noreferrer" href="https://github.com/hhwjsw711">
          <span className="sr-only">Github</span>
          <FaGithub size={22} className="fill-[#878787]" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://youtube.com/@hhwjsw711"
        >
          <span className="sr-only">Youtube</span>
          <FaYoutube size={22} className="fill-[#878787]" />
        </a>
      </li>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" className="cursor-pointer">
              <div className="flex items-center gap-2">
                <span className="sr-only">Wechat</span>
                <SiWechat size={22} className="fill-[#878787]" />
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            sideOffset={15}
            className="flex items-center gap-2 p-2 text-xs"
          >
            <Image
              src={footerWechat}
              alt="Wechat"
              className="w-full max-w-[120px] h-auto rounded-md"
            />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ul>
  );
}
