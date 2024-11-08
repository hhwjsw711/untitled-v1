"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@v1/ui/accordion";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@v1/ui/context-menu";
import { Icons } from "@v1/ui/icons";
import { Logo } from "@v1/ui/logo";
import { cn } from "@v1/ui/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import menuAssistant from "public/menu-assistant.jpg";
import menuEngine from "public/menu-engine.png";
import { useEffect, useState } from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import {
  MdOutlineDashboardCustomize,
  MdOutlineDescription,
  MdOutlineIntegrationInstructions,
  MdOutlineMemory,
} from "react-icons/md";

const listVariant = {
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const itemVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export function Header() {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastPath = `/${pathname.split("/").pop()}`;

  useEffect(() => {
    const setPixelRatio = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      document.documentElement.style.setProperty(
        "--pixel-ratio",
        `${1 / pixelRatio}`,
      );
    };

    setPixelRatio();
    window.addEventListener("resize", setPixelRatio);

    return () => window.removeEventListener("resize", setPixelRatio);
  }, []);

  const handleToggleMenu = () => {
    setOpen((prev) => {
      document.body.style.overflow = prev ? "" : "hidden";
      return !prev;
    });
  };

  const handleOnClick = () => {
    setShowBlur(false);
    setHidden(true);

    setTimeout(() => {
      setHidden(false);
    }, 100);
  };

  const links = [
    {
      title: "Features",
      cover: (
        <Link href="/#assistant" onClick={handleOnClick}>
          <Image alt="Assistant" src={menuAssistant} quality={100} />
        </Link>
      ),
      children: [
        {
          path: "/overview",
          title: "Overview",
          icon: <Icons.Overview size={20} />,
        },
        {
          path: "/inbox",
          title: "Inbox",
          icon: <Icons.Inbox2 size={20} />,
        },
        {
          path: "/vault",
          title: "Vault",
          icon: <Icons.Files size={20} />,
        },
        {
          path: "/tracker",
          title: "Tracker",
          icon: <Icons.Tracker size={20} />,
        },
        {
          path: "/invoice",
          title: "Invoice",
          icon: <Icons.Invoice size={20} />,
        },
      ],
    },
    {
      title: "Pricing",
      path: "/pricing",
    },
    {
      title: "Updates",
      path: "/updates",
    },
    {
      title: "Story",
      path: "/story",
    },
    {
      title: "Download",
      path: "/download",
    },
    {
      title: "Developers",
      cover: (
        <Link href="/engine" onClick={handleOnClick}>
          <Image alt="Engine" src={menuEngine} quality={100} />
        </Link>
      ),
      children: [
        {
          path: "https://git.new/midday",
          title: "Open Source",
          icon: <FaGithub size={19} />,
        },
        {
          path: "https://docs.midday.ai",
          title: "Documentation",
          icon: <MdOutlineDescription size={20} />,
        },
        {
          path: "/engine",
          title: "Engine",
          icon: <MdOutlineMemory size={20} />,
        },
        {
          title: "Join the community",
          path: "https://go.midday.ai/anPiuRx",
          icon: <FaDiscord size={19} />,
        },
        {
          title: "Apps & Integrations",
          path: "https://docs.midday.ai",
          icon: <MdOutlineIntegrationInstructions size={20} />,
        },
        {
          path: "/components",
          title: "Components",
          icon: <MdOutlineDashboardCustomize size={20} />,
        },
      ],
    },
  ];

  if (pathname.includes("pitch")) {
    return null;
  }

  return (
    <header
      className={cn(
        "sticky mt-4 top-4 z-50 px-2 md:px-4 md:flex justify-center",
        pathname === "/" &&
          "transition duration-1s ease-in-out animate-header-slide-down-fade",
      )}
    >
      <nav className="border border-border px-4 flex items-center backdrop-filter backdrop-blur-xl bg-[#121212] bg-opacity-70 h-[50px] z-20">
        <ContextMenu>
          <ContextMenuTrigger>
            <Link href="/">
              <span className="sr-only">Untitled Logo</span>
              <Logo />
            </Link>
          </ContextMenuTrigger>

          <ContextMenuContent
            className="w-[200px] bg-[#121212] rounded-none"
            alignOffset={20}
          >
            <div className="divide-y">
              <ContextMenuItem
                className="flex items-center space-x-2"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      `<svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="102"
                        height="30"
                        viewBox="0 0 102 30"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.9344 4.0625H16.9344C19.2333 4.06249 21.0385 4.06248 22.4618 4.22325C23.9145 4.38735 25.0925 4.72953 26.0718 5.50286C26.3649 5.73436 26.6366 5.99006 26.8838 6.26725C27.7165 7.20126 28.0884 8.33336 28.2655 9.72231C28.4375 11.0716 28.4375 12.779 28.4375 14.9341V15.066C28.4375 17.221 28.4375 18.9284 28.2655 20.2778C28.0884 21.6666 27.7165 22.7987 26.8838 23.7328C26.6366 24.01 26.3649 24.2656 26.0718 24.4971C25.0925 25.2705 23.9145 25.6126 22.4618 25.7768C21.0385 25.9375 19.2333 25.9375 16.9344 25.9375H13.0656C10.7668 25.9375 8.96146 25.9375 7.53823 25.7768C6.08553 25.6126 4.9075 25.2705 3.92829 24.4971C3.63514 24.2656 3.36335 24.0099 3.11623 23.7328C2.28351 22.7987 1.91165 21.6666 1.73454 20.2778C1.56248 18.9284 1.56249 17.2209 1.5625 15.0659V14.9341C1.56249 12.779 1.56248 11.0716 1.73454 9.72231C1.91165 8.33336 2.28351 7.20126 3.11623 6.26725C3.36335 5.99006 3.63514 5.73436 3.92829 5.50286C4.9075 4.72953 6.08553 4.38735 7.53823 4.22325C8.96146 4.06248 10.7668 4.06249 13.0656 4.0625H16.9344Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10 10V18.125C10 19.8569 11.3989 21.25 13.125 21.25H16.875C18.6011 21.25 20 19.8569 20 18.125V10H17.5V18.125C17.5 18.4702 17.2202 18.75 16.875 18.75H13.125C12.7798 18.75 12.5 18.4702 12.5 18.125V10H10Z"
                          fill="var(--background)"
                        />
                        <path
                          fill="currentColor"
                          d="M40.224 11.912h1.395l.056 1.674c.446-1.21 1.47-1.898 2.846-1.898 1.414 0 2.438.763 2.865 2.084.428-1.34 1.47-2.084 3.014-2.084 1.973 0 3.126 1.377 3.126 3.74v6.344H52v-5.897c0-1.805-.707-2.828-1.916-2.828-1.544 0-2.437 1.041-2.437 2.846v5.88H46.12v-5.899c0-1.767-.725-2.827-1.916-2.827-1.526 0-2.456 1.079-2.456 2.827v5.898h-1.525v-9.86Z M56.212 11.912h1.525v9.86h-1.525v-9.86Zm-.037-1.544V8.6h1.6v1.768h-1.6Z M68.936 8.563v13.21H67.56l-.056-1.452c-.558 1.042-1.619 1.675-3.144 1.675-2.847 0-4.168-2.419-4.168-5.154s1.321-5.153 4.168-5.153c1.45 0 2.493.558 3.05 1.562V8.563h1.526Z M80.129 8.563v13.21h-1.377l-.056-1.452c-.558 1.042-1.618 1.675-3.144 1.675-2.847 0-4.168-2.419-4.168-5.154s1.321-5.153 4.168-5.153c1.451 0 2.493.558 3.051 1.562V8.563h1.526Z M92.34 11.912h1.637l2.995 8.223 2.884-8.223h1.619l-4 11.107c-.372 1.06-1.08 1.544-2.196 1.544h-1.172v-1.358h1.024c.502 0 .8-.186.986-.707l.353-.912h-.52l-3.61-9.674Z"
                        />
                      </svg>`,
                    );
                  } catch {}
                }}
              >
                <Icons.LogoIcon />
                <span className="font-medium text-sm">Copy Logo as SVG</span>
              </ContextMenuItem>
              <ContextMenuItem asChild>
                <Link href="/branding" className="flex items-center space-x-2">
                  <Icons.Change />
                  <span className="font-medium text-sm">Branding</span>
                </Link>
              </ContextMenuItem>
              <ContextMenuItem>
                <a
                  href="https://ui.midday.ai"
                  className="flex items-center space-x-2"
                >
                  <Icons.Palette />
                  <span className="font-medium text-sm">Design System</span>
                </a>
              </ContextMenuItem>
            </div>
          </ContextMenuContent>
        </ContextMenu>

        <ul className="space-x-2 font-medium text-sm hidden md:flex mx-3">
          {links.map(({ path, title, children, cover }) => {
            if (path) {
              return (
                <li key={path}>
                  <Link
                    onClick={handleOnClick}
                    href={path}
                    className="h-8 items-center justify-center text-sm font-medium px-3 py-2 inline-flex text-secondary-foreground transition-opacity hover:opacity-70 duration-200"
                  >
                    {title}
                  </Link>
                </li>
              );
            }

            return (
              <li
                key={title}
                className="group"
                onMouseEnter={() => setShowBlur(true)}
                onMouseLeave={() => setShowBlur(false)}
              >
                <span className="h-8 items-center justify-center text-sm font-medium transition-opacity hover:opacity-70 duration-200 px-3 py-2 inline-flex text-secondary-foreground cursor-pointer">
                  {title}
                </span>

                {children && (
                  <div
                    className={cn(
                      "absolute top-[48px] left-0 -mx-[calc(var(--pixel-ratio)_*_2px)] bg-[#121212] flex h-0 group-hover:h-[250px] overflow-hidden transition-all duration-300 ease-in-out border-l border-r",
                      hidden && "hidden",
                    )}
                  >
                    <ul className="p-4 w-[200px] flex-0 space-y-4 mt-2">
                      {children.map((child) => {
                        return (
                          <li key={child.title}>
                            <Link
                              onClick={handleOnClick}
                              href={child.path}
                              className="flex space-x-2 items-center transition-opacity hover:opacity-70 duration-200"
                            >
                              <span>{child.icon}</span>
                              <span className="text-sm font-medium">
                                {child.title}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="flex-1 p-4">{cover}</div>
                    <div className="absolute bottom-0 w-full border-b-[1px]" />
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="ml-auto md:hidden p-2"
          onClick={() => handleToggleMenu()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={13}
            fill="none"
          >
            <path
              fill="currentColor"
              d="M0 12.195v-2.007h18v2.007H0Zm0-5.017V5.172h18v2.006H0Zm0-5.016V.155h18v2.007H0Z"
            />
          </svg>
        </button>

        <a
          className="text-sm font-medium pr-2 border-l-[1px] border-border pl-4 hidden md:block"
          href="https://app.untitled.uno"
        >
          Sign in
        </a>
      </nav>

      {isOpen && (
        <motion.div
          className="fixed bg-background -top-[2px] right-0 left-0 bottom-0 h-screen z-10 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="mt-4 flex justify-between p-3 px-4 relative ml-[1px]">
            <button type="button" onClick={handleToggleMenu}>
              <span className="sr-only">Untitled Logo</span>
              <Logo />
            </button>

            <button
              type="button"
              className="ml-auto md:hidden p-2 absolute right-[10px] top-2"
              onClick={handleToggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                className="fill-primary"
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            </button>
          </div>

          <div className="h-screen pb-[150px] overflow-auto">
            <motion.ul
              initial="hidden"
              animate="show"
              className="px-3 pt-8 text-xl text-[#878787] space-y-8 mb-8 overflow-auto"
              variants={listVariant}
            >
              {links.map(({ path, title, children }) => {
                const isActive =
                  path === "/updates"
                    ? pathname.includes("updates")
                    : path === lastPath;

                if (path) {
                  return (
                    <motion.li variants={itemVariant} key={path}>
                      <Link
                        href={path}
                        className={cn(isActive && "text-primary")}
                        onClick={handleToggleMenu}
                      >
                        {title}
                      </Link>
                    </motion.li>
                  );
                }

                return (
                  <li key={path}>
                    <Accordion collapsible type="single">
                      <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger className="flex items-center justify-between w-full font-normal p-0 hover:no-underline">
                          <span className="text-[#878787] text-xl">
                            {title}
                          </span>
                        </AccordionTrigger>

                        {children && (
                          <AccordionContent className="text-xl">
                            <ul className="space-y-8 ml-4 mt-6" key={path}>
                              {children.map((child) => {
                                return (
                                  <li key={child.path}>
                                    <Link
                                      onClick={handleToggleMenu}
                                      href={child.path}
                                      className="text-[#878787]"
                                    >
                                      {child.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </AccordionContent>
                        )}
                      </AccordionItem>
                    </Accordion>
                  </li>
                );
              })}

              <motion.li
                className="mt-auto border-t-[1px] pt-8"
                variants={itemVariant}
              >
                <Link
                  className="text-xl text-primary"
                  href="https://app.midday.ai"
                >
                  Sign in
                </Link>
              </motion.li>
            </motion.ul>
          </div>
        </motion.div>
      )}

      <div
        className={cn(
          "fixed w-screen h-screen backdrop-blur-md left-0 top-0 invisible opacity-0 transition-all duration-300 z-10",
          showBlur && "md:visible opacity-100",
        )}
      />
    </header>
  );
}
