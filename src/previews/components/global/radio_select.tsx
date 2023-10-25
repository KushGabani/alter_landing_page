import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

type Props<T> = {
  items: { key: T; text: string }[];
  label?: string;
  selected?: T;
  className?: string;
  onSelect: (key: T) => void;
};

export function RadioSelect<T extends string>({
  items,
  label,
  selected,
  className,
  onSelect,
}: Props<T>) {
  return (
    <div>
      <label className="text-xs text-gray-500 whitespace-nowrap">{label}</label>
      <RadioGroup.Root
        className={`flex-between border focus-within:ring-1 !mt-0 focus-within:ring-primary-400 overflow-clip rounded-md ${className}`}
        onValueChange={onSelect}
        aria-label="View density"
      >
        {items.map((item, i) => (
          <RadioGroup.Item
            key={`${item.key}_${i}`}
            className={`text-sm flex-grow font-medium text-center w-fit py-2 px-3 ${
              selected === item.key
                ? "bg-primary-400 text-white hover:bg-primary-500 outline-none"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            checked={selected === item.key}
            value={item.key}
            id={item.key}
          >
            {item.text}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
}
