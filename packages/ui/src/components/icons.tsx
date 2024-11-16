import { Check, Copy, Loader2, LogOut } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import {
  MdAdd,
  MdArrowBack,
  MdArrowRight,
  MdBarChart,
  MdChangeHistory,
  MdClose,
  MdDragIndicator,
  MdExpandLess,
  MdExpandMore,
  MdIosShare,
  MdOutlineArrowOutward,
  MdOutlineAssuredWorkload,
  MdOutlineAttachMoney,
  MdOutlineCalculate,
  MdOutlineCalendarMonth,
  MdOutlineChatBubbleOutline,
  MdOutlineClear,
  MdOutlineConfirmationNumber,
  MdOutlineCropFree,
  MdOutlineDescription,
  MdOutlineFace,
  MdOutlineFactCheck,
  MdOutlineFilterList,
  MdOutlineInbox,
  MdOutlineInventory2,
  MdOutlineLaunch,
  MdOutlineMoreVert,
  MdOutlinePalette,
  MdOutlineQrCode2,
  MdOutlineSettings,
  MdOutlineStyle,
  MdOutlineTimer,
  MdOutlineVisibility,
  MdSearch,
} from "react-icons/md";
import { PiDiscordLogo } from "react-icons/pi";

export const Icons = {
  LogoSmall: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 299 297"
      fill="none"
      {...props}
    >
      <path
        d="M127.103 162.325V0H101.376V96.7823C101.376 127.103 84.5314 143.336 59.417 143.336C35.8339 143.336 25.7269 127.103 25.7269 96.7823V0H0V104.439C0 138.742 17.7638 166 53.9041 166C75.3432 166 94.0258 156.506 102.601 135.373V162.325H127.103Z"
        fill="currentColor"
      />
      <path
        d="M103 134.675V297H128.727V199.911C128.727 169.897 145.878 153.664 171.605 153.664C196.107 153.664 206.214 169.897 206.214 199.911V297H231.941V192.561C231.941 158.258 214.177 131 177.118 131C154.76 131 135.465 140.801 127.196 162.852L126.583 134.675H103Z"
        fill="currentColor"
      />
      <path
        d="M225.812 166C269.56 166 298.325 133.639 298.325 83C298.325 32.361 269.56 0 225.812 0C181.765 0 153 32.361 153 83C153 133.639 181.765 166 225.812 166ZM179.368 83C179.368 46.1444 196.448 23.9711 225.812 23.9711C254.877 23.9711 271.957 46.1444 271.957 83C271.957 119.856 254.877 142.029 225.812 142.029C196.448 142.029 179.368 119.856 179.368 83Z"
        fill="currentColor"
      />
    </svg>
  ),
  LogoIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 299 297"
      fill="none"
      {...props}
    >
      <path
        d="M127.103 162.325V0H101.376V96.7823C101.376 127.103 84.5314 143.336 59.417 143.336C35.8339 143.336 25.7269 127.103 25.7269 96.7823V0H0V104.439C0 138.742 17.7638 166 53.9041 166C75.3432 166 94.0258 156.506 102.601 135.373V162.325H127.103Z"
        fill="currentColor"
      />
      <path
        d="M103 134.675V297H128.727V199.911C128.727 169.897 145.878 153.664 171.605 153.664C196.107 153.664 206.214 169.897 206.214 199.911V297H231.941V192.561C231.941 158.258 214.177 131 177.118 131C154.76 131 135.465 140.801 127.196 162.852L126.583 134.675H103Z"
        fill="currentColor"
      />
      <path
        d="M225.812 166C269.56 166 298.325 133.639 298.325 83C298.325 32.361 269.56 0 225.812 0C181.765 0 153 32.361 153 83C153 133.639 181.765 166 225.812 166ZM179.368 83C179.368 46.1444 196.448 23.9711 225.812 23.9711C254.877 23.9711 271.957 46.1444 271.957 83C271.957 119.856 254.877 142.029 225.812 142.029C196.448 142.029 179.368 119.856 179.368 83Z"
        fill="currentColor"
      />
    </svg>
  ),
  X: FaXTwitter,
  Discord: PiDiscordLogo,
  GithubOutline: FiGithub,
  SignOut: LogOut,
  Copy,
  Check,
  Close: MdClose,
  Loader: Loader2,
  Overview: MdBarChart,
  Files: MdOutlineInventory2,
  Inbox2: MdOutlineInbox,
  Tracker: MdOutlineTimer,
  Invoice: MdOutlineDescription,
  Change: MdChangeHistory,
  Palette: MdOutlinePalette,
  ChatBubble: MdOutlineChatBubbleOutline,
  Settings: MdOutlineSettings,
  Add: MdAdd,
  Clear: MdOutlineClear,
  ArrowBack: MdArrowBack,
  ArrowRight: MdArrowRight,
  Share: MdIosShare,
  ChevronDown: MdExpandMore,
  ChevronUp: MdExpandLess,
  Search: MdSearch,
  CalendarMonth: MdOutlineCalendarMonth,
  Filter: MdOutlineFilterList,
  Face: MdOutlineFace,
  Status: MdOutlineStyle,
  Visibility: MdOutlineVisibility,
  DragIndicator: MdDragIndicator,
  ExternalLink: MdOutlineLaunch,
  Sidebar: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="currentColor"
      viewBox="0 -960 960 960"
      {...props}
    >
      <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm240-80h400v-480H400v480Zm-80 0v-480H160v480h160Zm-160 0v-480 480Zm160 0h80-80Zm0-480h80-80Z" />
    </svg>
  ),
  SidebarFilled: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="currentColor"
      viewBox="0 -960 960 960"
      {...props}
    >
      <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h160v640H160Zm240 0v-640h400q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H400Z" />
    </svg>
  ),
  Decimals: ({
    className,
    size = 24,
    ...props
  }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 -960 960 960"
      width={size}
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="m720-80-56-56 63-64H480v-80h247l-63-64 56-56 160 160L720-80ZM80-440v-120h120v120H80Zm300 0q-58 0-99-41t-41-99v-160q0-58 41-99t99-41q58 0 99 41t41 99v160q0 58-41 99t-99 41Zm360 0q-58 0-99-41t-41-99v-160q0-58 41-99t99-41q58 0 99 41t41 99v160q0 58-41 99t-99 41Zm-360-80q25 0 42.5-17.5T440-580v-160q0-25-17.5-42.5T380-800q-25 0-42.5 17.5T320-740v160q0 25 17.5 42.5T380-520Zm360 0q25 0 42.5-17.5T800-580v-160q0-25-17.5-42.5T740-800q-25 0-42.5 17.5T680-740v160q0 25 17.5 42.5T740-520Z" />
    </svg>
  ),
  DateFormat: MdOutlineFactCheck,
  CropFree: MdOutlineCropFree,
  Tax: MdOutlineAssuredWorkload,
  Vat: MdOutlineCalculate,
  CurrencyOutline: MdOutlineAttachMoney,
  ConfirmationNumber: MdOutlineConfirmationNumber,
  QrCode: MdOutlineQrCode2,
  MoreVertical: MdOutlineMoreVert,
  ArrowOutward: MdOutlineArrowOutward,
};
