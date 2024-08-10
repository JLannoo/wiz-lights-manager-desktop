"use client";

import * as React from "react";
import { 
    Check as Selected,
    ChevronDown as Down,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@radix-ui/react-label";

type ComboboxOption = {
    value: string;
    label: string;
};

type ComboboxProps = {
    label?: string;
    options: ComboboxOption[];
    value: string;
    onChange: (value: string) => void;
    unselectedText?: string;
    noOptionsText?: string;
    searchPlaceholder?: string;
};

export function Combobox({ 
    label,
    options = [],
    value,
    onChange,
    unselectedText: emptyText = "Select...",
    noOptionsText = "No options :(",
    searchPlaceholder = "Search...", 
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false);

    const selectionLabel = options.find((option) => option.value === value)?.label;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="flex flex-col">
                    {label && (
                        <Label className="text-sm text-gray-500">{label}</Label>
                    )}
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {selectionLabel || emptyText}
                        <Down className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList>
                        <CommandEmpty>{noOptionsText}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Selected
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === option.value ? "opacity-100" : "opacity-0",
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
