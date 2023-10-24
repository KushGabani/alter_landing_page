"use client";

import React from "react";
import { type Table, flexRender } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "./button";

type TableProps<T> = {
  table: Table<T>;
  customHeading?: JSX.Element;
  loading?: boolean;
  showHeading?: boolean;
  cellClassName?: string;
};

export const TanStackTable = <TData extends object>({
  table,
  loading = false,
  customHeading,
  showHeading = true,
  cellClassName = "py-2 px-8",
}: TableProps<TData>): React.JSX.Element => {
  return (
    <div className="space-y-4 w-full">
      <div className="bg-gray-50 border overflow-hidden rounded-md">
        {customHeading}
        <div className="overflow-x-scroll">
          <table className="min-w-full w-max table-fixed">
            {showHeading && (
              <thead className="border-b">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="py-3 px-8 text-[0.8rem] first:bg-gray-50 text-center first:text-start text-gray-500 font-normal"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
            )}
            <tbody className="text-sm text-gray-600">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="group cursor-pointer border-b border-neutral-00 bg-white last:border-none text-[0.8rem] hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className={`first:bg-white first:group-hover:bg-gray-50 ${cellClassName}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {table.getRowModel().rows.length == 0 && (
            <div className="w-full text-center h-56 flex-center text-gray-500 text-lg">
              {loading ? "Fetching Records..." : "No Records Found"}
            </div>
          )}
          {loading && (
            <div className="overflow-hidden">
              <div className="w-full bg-primary-400 h-1 animate-loader" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
