import { cn } from "../utils";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  [key: string]: unknown | undefined;
}

export function Logo({ width, height, className, ...args }: LogoProps) {
  return (
    <svg
      {...args}
      width={width ?? 24}
      height={height ?? 24}
      viewBox="0 0 299 297"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-gray-800 dark:text-gray-200", className)}
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
  );
}
