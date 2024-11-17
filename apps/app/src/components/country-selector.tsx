import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import countries from "@v1/location/country-flags";
import { Button } from "@v1/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@v1/ui/command";
import {
  Popover,
  PopoverContentWithoutPortal,
  PopoverTrigger,
} from "@v1/ui/popover";
import { cn } from "@v1/ui/utils";
import * as React from "react";
import { useEffect } from "react";

type Props = {
  defaultValue: string;
  onSelect: (countryCode: string, countryName: string) => void;
};

export function CountrySelector({ defaultValue, onSelect }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);

  useEffect(() => {
    if (value !== defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue, value]);

  const selected = Object.values(countries).find(
    (country) => country.code === value || country.name === value,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className="w-full justify-between font-normal truncate bg-accent"
        >
          {value ? selected?.name : "Select country"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContentWithoutPortal className="w-[225px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." className="h-9 px-2" />
          <CommandEmpty>No country found.</CommandEmpty>
        </Command>
      </PopoverContentWithoutPortal>
    </Popover>
  );
}
