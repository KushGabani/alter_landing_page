import React, { useState, useEffect, useRef } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Loading } from "../global";
import { CheckIcon } from "@radix-ui/react-icons";
import { isIncluded } from "./utils";

type NonNullableKeys<TObj> = {
  [TKey in keyof TObj]: undefined extends TObj[TKey] ? never : TKey;
}[keyof TObj];

export type BaseSelectFieldProps<TObj, MultiSelect> = {
  className?: string;
  icon?: React.ReactNode;
  label: string;
  placeholder: string;
  options: TObj[];
  selected: MultiSelect extends true ? TObj[] : TObj | undefined;
  onSelect: (item?: TObj) => void;
  query?: string | undefined;
  setQuery?: (query: string | undefined) => void;
  isFetching?: boolean;
  renderItem: (item: TObj, query?: string) => React.ReactNode;
  searchKey: NonNullableKeys<TObj>;
  createItem?: (value: string) => void;
  createForm?: JSX.Element;
  isCreating?: boolean;
  getOptionLabel?: () => JSX.Element;
  sanitizeValue?: (value: string) => string;
  focusOnMount?: boolean;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onTab?: (
    event: React.KeyboardEvent<Element>,
    direction: "tab" | "shift_tab"
  ) => void;
  error?: string;
};

export function BaseSelectField<
  TObj extends Pick<TObj, NonNullableKeys<TObj>> & { id: number },
  MultiSelect extends boolean = false
>({
  className,
  icon,
  label,
  placeholder,
  options,
  selected,
  onSelect,
  searchKey,
  query,
  setQuery,
  isFetching,
  renderItem,
  createItem,
  createForm,
  isCreating,
  getOptionLabel,
  sanitizeValue,
  focusOnMount,
  disabled,
  onFocus,
  onBlur,
  onTab,
  error,
}: BaseSelectFieldProps<TObj, MultiSelect>) {
  const [showOptions, setShowOptions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isArray = Array.isArray(selected);

  const checkIfExists = (): boolean => {
    if (!inputRef.current) return false;

    const searchQuery = inputRef.current.value.trim();
    if (searchQuery.length < 1) return true;

    if (Array.isArray(selected)) {
      return (
        options.findIndex((e) => e[searchKey] === searchQuery) !== -1 ||
        selected.findIndex((e) => e[searchKey] === searchQuery) !== -1
      );
    } else {
      return (
        options.findIndex(
          (e) =>
            e[searchKey] === searchQuery ||
            (selected && selected[searchKey] === searchQuery)
        ) !== -1
      );
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    // clear selection and allow user to search for another option
    if (selected && !isArray) onSelect(undefined);

    // Update query with a debounce
    setQuery && setQuery(sanitizedValue.trim());
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    !showOptions && setShowOptions(true);
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : options.length
      );
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < options.length ? prevIndex + 1 : 0
      );
    } else if (event.key === "Enter") {
      event.stopPropagation();
      event.preventDefault();
      if (!checkIfExists() && highlightedIndex === options.length) {
        if (event.ctrlKey && createItem) {
          if (inputRef.current) inputRef.current.value = "";
          createItem(query!);
        } else {
          if (inputRef.current) inputRef.current.value = "";
        }
        showOptions && setShowOptions(false);
      } else if (options.length > 0 && highlightedIndex !== -1) {
        selectItem(options[highlightedIndex]);
      }
    } else if (
      event.key === "Backspace" &&
      !inputRef.current?.value &&
      selected
    ) {
      onSelect(
        isArray && selected.length !== 0
          ? selected[selected.length - 1]
          : undefined
      );
    } else if (event.key === "Tab" && onTab) {
      if (event.shiftKey) {
        onTab(event, "shift_tab");
        // Handle shift tab
      } else {
        onTab(event, "tab");
        // Handle tab
      }
    }
  };

  const handleMouseEnter = (index: number) => setHighlightedIndex(index);

  const handleMouseLeave = () => setHighlightedIndex(-1);

  // upon selection, set the select field and clear the search box
  const selectItem = (item: TObj) => {
    if (inputRef.current && !isArray) {
      inputRef.current.value = "";
    }

    onSelect(item);
  };

  // focus on the input field if focusOnMount is true
  useEffect(() => {
    if (inputRef.current && focusOnMount) {
      inputRef.current.focus();
    }
  }, []);

  // reset selection if options have changed
  useEffect(() => {
    setHighlightedIndex(0);
    if (options.length === 1 && !isArray && inputRef.current) {
      onSelect(options[0]);
      inputRef.current.value == "";
    }
  }, [options]);

  return (
    <>
      <div className={`relative ${className}`}>
        <label className="text-xs text-gray-500 whitespace-nowrap">
          {label}
        </label>
        <div
          className={`mt-1 h-10 flex-start ${
            disabled ? "bg-gray-100" : "bg-white"
          } rounded-md shadow-sm border border-gray-200 focus-within:border focus-within:border-primary-600`}
        >
          {icon && (
            <div className="flex-center px-3 h-full rounded-l-md bg-gray-100 text-gray-600 ">
              {icon}
            </div>
          )}
          <div className="flex-center w-full h-full rounded-r-md">
            <Loading isLoading={Boolean(isCreating || false)} className="ml-5">
              {(!isArray && selected) || (isArray && selected.length > 0) ? (
                getOptionLabel ? (
                  <div
                    className="ml-3 min-w-fit"
                    onMouseDown={() => setShowOptions(true)}
                  >
                    {getOptionLabel()}
                  </div>
                ) : (
                  <span
                    className="ml-3 text-xs px-2 py-1 rounded-md bg-primary-100 text-primary-400 group-hover:bg-primary-200 whitespace-nowrap"
                    onMouseDown={() => setShowOptions(true)}
                  >
                    {isArray
                      ? selected.map((e) => e[searchKey]).join(", ")
                      : selected[searchKey]}
                  </span>
                )
              ) : undefined}
            </Loading>
            <input
              type={"text"}
              ref={inputRef}
              aria-invalid={error ? "true" : "false"}
              disabled={disabled}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={!isCreating ? placeholder : "Creating ..."}
              className="block w-full disabled:bg-gray-100 focus:outline-none bg-transparent h-10 px-3 py-1 text-primary-800 rounded-md sm:text-sm"
              onFocus={() => {
                onFocus && onFocus();
                setShowOptions(true);
              }}
              onBlur={(e) => {
                e.target.value = "";
                onBlur && onBlur(e);
                showOptions && setShowOptions(false);
              }}
            />
          </div>
        </div>
        {error && (
          <div role="alert" className="flex text-red text-xs space-x-1 mt-1">
            <span>*</span>
            <span>{error}</span>
          </div>
        )}
        {showOptions && (
          <ul className="absolute overflow-y-scroll overflow-x-clip min-w-max left-0 z-[1] right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-sm">
            <Loading
              isLoading={isFetching || false}
              className="flex-center my-5"
            >
              <div>
                {options.map((item, index) => {
                  const checked =
                    selected &&
                    (isArray
                      ? isIncluded<TObj>(selected, (e) => e.id == item.id)
                      : selected.id === item.id);
                  const highlighted = index === highlightedIndex;
                  return (
                    <li
                      key={index}
                      className={`flex-start space-x-2 px-3 py-2 text-xs cursor-pointer ${
                        highlighted ? "bg-gray-100" : ""
                      }`}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      onMouseDown={() => selectItem(item)}
                    >
                      {isArray && (
                        <Checkbox.Root
                          className={`flex-center rounded-[0.3rem] p-[1px] w-5 h-5 text-white ${
                            checked
                              ? "bg-primary-300"
                              : "border border-gray-300 bg-gray-50"
                          }`}
                          id={item.id.toString()}
                          checked={checked}
                        >
                          <Checkbox.Indicator>
                            <CheckIcon />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                      )}
                      <div
                        className={`w-full ${
                          !isArray && checked
                            ? "text-primary-400 font-medium"
                            : ""
                        }`}
                      >
                        {renderItem(item, inputRef.current?.value.trim())}
                      </div>
                    </li>
                  );
                })}
                {query && options.length === 0 && (
                  <div className="text-xs text-gray-500 mx-5 mt-3 mb-4">
                    No {label} matching <em>"{query}"</em> found
                  </div>
                )}
                {!query && options.length === 0 && (
                  <div className="text-xs text-gray-500 mx-5 mt-3 mb-4">
                    No {label} Found
                  </div>
                )}
              </div>
            </Loading>
            {!isFetching &&
              inputRef.current &&
              inputRef.current.value.length > 0 && (
                <li
                  key="create_item"
                  className={`px-4 py-3 w-full text-start cursor-pointer text-xs italic ${
                    options.length === highlightedIndex
                      ? "bg-yellow-500 text-white"
                      : ""
                  }`}
                >
                  <span>{`Create a new ${label} "${query}"`}</span>
                  <span>{options.length === highlightedIndex ? " ↵" : ""}</span>
                </li>
              )}
          </ul>
        )}
      </div>
    </>
  );
}
