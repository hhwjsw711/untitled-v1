import { cn } from "@v1/ui/utils";

interface SidebarItemProps {
  chat: {
    id: string;
    title: string;
  };
  onSelect: (id: string) => void;
}

export function SidebarItem({ chat, onSelect }: SidebarItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "text-left transition-colors px-0 py-1 rounded-lg w-full text-[#878787] hover:text-primary",
      )}
      onClick={() => onSelect(chat.title)}
    >
      <span className="text-xs line-clamp-1">{chat.title}</span>
    </button>
  );
}
