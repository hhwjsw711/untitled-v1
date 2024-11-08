import { Check, Copy, Loader2, LogOut } from "lucide-react";
import {
  MdBarChart,
  MdChangeHistory,
  MdOutlineDescription,
  MdOutlineInbox,
  MdOutlineInventory2,
  MdOutlinePalette,
  MdOutlineTimer,
} from "react-icons/md";

export const Icons = {
  LogoIcon: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={17}
      fill="none"
      viewBox="0 0 16 17"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.03167 2.16667H9.03167C10.2577 2.16666 11.2205 2.16665 11.9796 2.25907C12.7544 2.35325 13.3827 2.52241 13.9049 2.93486C14.0613 3.05833 14.2062 3.19470 14.3380 3.34253C14.7821 3.84067 14.9805 4.44446 15.0749 5.18523C15.1667 5.90485 15.1667 6.81547 15.1667 7.96487V8.03520C15.1667 9.18453 15.1667 10.0951 15.0749 10.8148C14.9805 11.5555 14.7821 12.1593 14.3380 12.6575C14.2062 12.8053 14.0613 12.9417 13.9049 13.0651C13.3827 13.4776 12.7544 13.6467 11.9796 13.7409C11.2205 13.8333 10.2577 13.8333 9.03167 13.8333H6.96833C5.74230 13.8333 4.77945 13.8333 4.02039 13.7409C3.24561 13.6467 2.61733 13.4776 2.09509 13.0651C1.93874 12.9417 1.79379 12.8053 1.66199 12.6575C1.21787 12.1593 1.01954 11.5555 0.925087 10.8148C0.833320 10.0951 0.833327 9.18447 0.833333 8.03513V8.03513V7.96487V7.96480C0.833327 6.81547 0.833320 5.90485 0.925087 5.18523C1.01954 4.44446 1.21787 3.84067 1.66199 3.34253C1.79379 3.19470 1.93874 3.05833 2.09509 2.93486C2.61733 2.52241 3.24561 2.35325 4.02039 2.25907C4.77945 2.16665 5.74230 2.16666 6.96833 2.16667H9.03167Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.33333 5.33333V9.66667C5.33333 10.5871 6.07953 11.3333 7 11.3333H9C9.92047 11.3333 10.6667 10.5871 10.6667 9.66667V5.33333H9.33333V9.66667C9.33333 9.85076 9.18409 10 9 10H7C6.81591 10 6.66667 9.85076 6.66667 9.66667V5.33333H5.33333Z"
        fill="hsl(var(--background))"
      />
    </svg>
  ),
  SignOut: LogOut,
  Copy,
  Check,
  Loader: Loader2,
  Overview: MdBarChart,
  Files: MdOutlineInventory2,
  Inbox2: MdOutlineInbox,
  Tracker: MdOutlineTimer,
  Invoice: MdOutlineDescription,
  Change: MdChangeHistory,
  Palette: MdOutlinePalette,
};
