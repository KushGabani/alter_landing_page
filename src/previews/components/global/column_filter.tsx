"use client";

import React from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import type { Column } from "@tanstack/react-table";

type Props<T> = {
  children: React.ReactNode;
  columns: Column<T, unknown>[];
  map: Record<string | number, string>;
};

export const ColumnFilter = <T extends object>({
  children,
  columns,
  map,
}: Props<T>) => {
  const resetVisibility = () => {
    columns.map((e) => e.toggleVisibility(false));
  };

  return (
    <Popover.Popover>
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content
        sideOffset={4}
        align="start"
        className="rounded-md border shadow-sm bg-white"
      >
        <div className="p-3 space-y-3">
          {columns.map((column, i) => (
            <div key={i} className="checkbox flex-start space-x-2">
              <Checkbox.Root
                onCheckedChange={(checked) =>
                  column.toggleVisibility(checked === true)
                }
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter")
                    column.toggleVisibility(!column.getIsVisible());
                }}
                checked={column.getIsVisible()}
                disabled={!column.getCanHide()}
                id={column.id}
              >
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label className=" text-xs text-start" htmlFor={column.id}>
                {map[column.id] ?? column.id}
              </label>
            </div>
          ))}
        </div>
        <hr className="text-gray-100" />
        <button
          onClick={resetVisibility}
          className="text-xs w-full text-gray-500 hover:bg-gray-100 text-center py-3"
        >
          Reset
        </button>
      </Popover.Content>
    </Popover.Popover>
  );
};
