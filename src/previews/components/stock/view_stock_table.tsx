import { useEffect, useRef, useState } from "react";
import {
  ArrowPathRoundedSquareIcon,
  MagnifyingGlassIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";

import { Button, ColumnFilter, TriggerButton, TanStackTable } from "../global";
import { DesignStatus, StockCategory } from "../../models/types";
import {
  StockModel,
  type StockQueryParams,
} from "../../models/stock/stock_model";
import { columnMap, useStockColumns } from "./stock_columns";
import { stocks } from "../../data/stock";
import {
  useReactTable,
  type VisibilityState,
  getCoreRowModel,
} from "@tanstack/react-table";
import { DesignSelector } from "../design/design_selector";

type Props = {
  category: StockCategory;
};

export const ViewStockTable = ({ category }: Props) => {
  const [query, setQuery] = useState<StockQueryParams>({});
  const searchRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<StockModel[]>(stocks);
  const columns = useStockColumns();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    design: true,
  });

  useEffect(() => {
    let filtered = structuredClone(stocks);
    if (query.search && query.search.trim().length > 0) {
      filtered = filtered.filter((stock) =>
        stock.name.toLowerCase().startsWith(query.search?.toLowerCase()!)
      );
    }
    if (query.designs && query.designs.length > 0) {
      filtered = filtered.filter((stock) =>
        query.designs?.some((design) => design.id === stock.design?.id)
      );
    }
    setData(filtered);
  }, [query]);

  const table = useReactTable({
    columns,
    data: data ?? [],
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  return (
    <div className="space-y-4 py-4">
      <div className="flex flex-wrap gap-y-2 gap-x-4">
        <Button
          type="button"
          variant="outline"
          icon={<ArrowPathRoundedSquareIcon width={"20px"} height={"20px"} />}
          text=""
        />
        <div className="flex items-center px-3 py-2 bg-white rounded-md border">
          <MagnifyingGlassIcon
            width={"18px"}
            height={"18px"}
            className="text-gray-600"
          />
          <input
            type="text"
            ref={searchRef}
            placeholder="Search"
            onChange={(e) => setQuery({ search: e.target.value })}
            className="block w-full focus:outline-none bg-transparent px-2 text-gray-800 placeholder:text-gray-400 rounded-md sm:text-sm"
          />
        </div>
        <DesignSelector
          selected={query.designs ?? []}
          onSelect={(design) => {
            if (!query.designs) {
              setQuery({
                designs: [design],
              });
            } else if (
              query.designs.findIndex((e) => e.id == design.id) !== -1
            ) {
              setQuery({
                designs: query.designs?.filter((c) => c.id !== design.id),
              });
            } else {
              setQuery({
                designs: [...query?.designs, design],
              });
            }
          }}
          query={{ status: new DesignStatus("COMPLETE") }}
          onClear={() => setQuery({ designs: [] })}
        />
        <ColumnFilter
          columns={table.getAllColumns().filter((c) => c.accessorFn)}
          map={columnMap}
        >
          <TriggerButton
            text="Columns"
            icon={
              <ViewColumnsIcon width={"18px"} height={"18px"} color="black" />
            }
          />
        </ColumnFilter>
        <Button
          type="button"
          variant="vanilla"
          onClick={() => {
            if (searchRef.current) searchRef.current.value = "";
            setQuery({});
          }}
          text="Clear"
          className="text-xs underline text-gray-300"
        />
      </div>

      <TanStackTable<StockModel>
        table={table}
        loading={false}
        showHeading={true}
        customHeading={
          <h2 className="text-lg font-medium pl-8 pt-4 pb-2">
            {category.key === "DELIVERED"
              ? "Delivered Stock"
              : `${category.text} Stock In Hand`}
          </h2>
        }
      />
    </div>
  );
};
