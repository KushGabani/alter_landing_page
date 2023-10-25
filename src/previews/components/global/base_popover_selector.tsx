import { useEffect, useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { TriggerButton } from "./index";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { isIncluded } from "./utils";

type Props<TObj> = {
  triggerLabel: string;
  icon?: JSX.Element;
  selected: TObj[];
  options: TObj[];
  renderItem: (item: TObj, query?: string) => React.ReactNode;
  onPopoverOpenChange?: (open: boolean) => void;
  onSelect: (item: TObj) => void;
  onClear: () => void;
  searchKey: NonNullableKeys<TObj>;
  disableSearch?: boolean;
  setSearch?: (search?: string) => void;
  sanitizeValue?: (value: string) => string;
  error?: string;
};

type NonNullableKeys<T> = {
  [TKey in keyof T]: undefined extends T[TKey] ? never : TKey;
}[keyof T];

export const BasePopoverSelector = <
  TObj extends Pick<TObj, NonNullableKeys<TObj>> & { id: number }
>({
  triggerLabel,
  icon,
  selected,
  options,
  renderItem,
  onPopoverOpenChange,
  onSelect,
  onClear,
  searchKey,
  disableSearch = false,
  setSearch,
  sanitizeValue,
  error,
}: Props<TObj>) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const highlightedRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    () => {
      setHighlightedIndex(0);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disableSearch) {
      event.target.value = "";
      return;
    }
    // Sanitize value if satinize function is provided
    const sanitizedValue = sanitizeValue
      ? sanitizeValue(event.target.value)
      : event.target.value;

    // If any invalid character is found, update input value and skip the
    // query on invalid characters
    if (event.target.value !== sanitizedValue) {
      event.target.value = sanitizedValue;
      return;
    }

    // Update query with a debounce
    setSearch && setSearch(sanitizedValue.trim());
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
      if (highlightedRef.current) highlightedRef.current.scrollIntoView(false);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < options.length - 1 ? prevIndex + 1 : options.length - 1
      );
      if (highlightedRef.current) highlightedRef.current.scrollIntoView(false);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (options.length > 0 && highlightedIndex !== -1) {
        onSelect(options[highlightedIndex]);
      }
    }
  };

  const handleMouseEnter = (index: number) => setHighlightedIndex(index);

  const handleMouseLeave = () => setHighlightedIndex(-1);

  return (
    <Popover.Popover onOpenChange={onPopoverOpenChange}>
      <Popover.Trigger>
        <TriggerButton text={triggerLabel} icon={icon}>
          {selected.length > 0 && (
            <>
              <span className="text-gray-400">|</span>
              {(selected.length > 3 ? selected.slice(0, 3) : selected).map(
                (e, i) => {
                  return (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-md bg-gray-100 group-hover:bg-gray-200 text-gray-500"
                    >
                      {e[searchKey]}
                    </span>
                  );
                }
              )}
              {selected.length > 3 && (
                <span className="text-xs text-gray-400">{`${
                  selected.length - 3
                } more`}</span>
              )}
            </>
          )}

          {error && <p className="text-xs text-red">{error}</p>}
        </TriggerButton>
      </Popover.Trigger>

      <Popover.Content
        sideOffset={4}
        align="start"
        className="PopoverContent !p-0 !shadow-sm rounded-md border bg-white"
      >
        {
          <div className="flex items-center px-3 py-2 border-b">
            <MagnifyingGlassIcon
              width={"18px"}
              height={"18px"}
              className="text-gray-600"
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              aria-invalid={error ? "true" : "false"}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={(e) => {
                e.preventDefault();
                setHighlightedIndex(-1);
              }}
              onFocus={(e) => {
                e.preventDefault();
                setHighlightedIndex(0);
              }}
              autoFocus={true}
              className="block w-full focus:outline-none bg-transparent px-2 text-gray-800 placeholder:text-gray-400 rounded-md sm:text-sm"
            />
          </div>
        }
        <div className="flex-col">
          <div className="max-h-56 overflow-y-auto">
            {options.map((item, index) => {
              const checked =
                selected && isIncluded<TObj>(selected, (e) => e.id == item.id);
              const highlighted = index === highlightedIndex;

              return (
                <li
                  ref={highlightedIndex + 1 === index ? highlightedRef : null}
                  key={index}
                  className={`w-full flex-start space-x-2 px-3 py-2 text-xs cursor-pointer ${
                    highlighted ? "bg-gray-100" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onMouseDown={() => onSelect(item)}
                >
                  <Checkbox.Root
                    className={`flex-center rounded-[0.3rem] p-[1px] w-5 h-5 text-white ${
                      checked
                        ? "bg-primary-300"
                        : "border border-gray-300 bg-gray-50"
                    }`}
                    tabIndex={-1}
                    id={item.id.toString()}
                    checked={checked}
                  >
                    <Checkbox.Indicator>
                      <CheckIcon />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <div>{renderItem(item, inputRef.current?.value.trim())}</div>
                </li>
              );
            })}
          </div>
          <hr />
          <button
            type="button"
            onClick={onClear}
            className="text-xs w-full text-gray-500 hover:bg-gray-100 bg-white text-center py-3"
          >
            Clear All
          </button>
        </div>
      </Popover.Content>
    </Popover.Popover>
  );
};
