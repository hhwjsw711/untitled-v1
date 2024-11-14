import { Input as BaseInput, type InputProps } from "@v1/ui/input";
import { cn } from "@v1/ui/utils";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export function Input({ className, ...props }: InputProps) {
  const { register, watch } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  const fieldName = props.name as string;
  const fieldValue = watch(fieldName);

  const { ref, ...rest } = register(fieldName, {
    valueAsNumber: props.type === "number",
  });

  const isPlaceholder = !fieldValue && !isFocused;

  return (
    <div className="relative">
      <BaseInput
        {...props}
        {...rest}
        ref={ref}
        autoComplete="off"
        value={fieldValue || ""}
        className={cn(
          "border-0 p-0 h-6 border-b border-transparent focus:border-border font-mono text-xs",
          isPlaceholder && "opacity-0",
          className,
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isPlaceholder && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-full bg-[repeating-linear-gradient(-60deg,#DBDBDB,#DBDBDB_1px,transparent_1px,transparent_5px)] dark:bg-[repeating-linear-gradient(-60deg,#2C2C2C,#2C2C2C_1px,transparent_1px,transparent_5px)]" />
        </div>
      )}
    </div>
  );
}
