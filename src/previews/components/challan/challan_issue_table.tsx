import { ClientCategory, type StockCategory } from "../../models/types";
import {
  type VisibilityState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { TanStackTable } from "../global/table";
import { ChallanIssueModel, ChallanListModel } from "../../models";
import { useIssueTableColumns } from "./challan_issue_columns";
import { type IssueQueryParams } from "../../models/challan/challan_issue_model";
import {
  LetterCaseCapitalizeIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Button } from "../global/button";
import { ChallanSelector } from "./challan_selector";
import { ClientSelector } from "../client/client_selector";
import {
  ClientModel,
  type ClientQueryParams,
} from "../../models/client/client_model";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { challan_issue } from "../../data/challan_issue";

type Props = {
  category: StockCategory;
  className?: string;
};

export const ChallanIssueTable = ({ className, category }: Props) => {
  const [data, setData] = useState(challan_issue);
  const [query, setQuery] = useState<IssueQueryParams>({});
  const initQuery: IssueQueryParams = {
    cursor: 0,
    category: [category],
    includeChallan: true,
    issued: false,
    take: 5,
  };

  const columns = useIssueTableColumns();

  const searchRef = useRef<HTMLInputElement>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  useEffect(() => {
    let filtered = structuredClone(challan_issue);
    if (query.search && query.search.trim().length > 0) {
      filtered = filtered.filter((issue) =>
        issue.serial.stock?.name
          .toLowerCase()
          .startsWith(query.search?.toLowerCase()!)
      );
    }
    if (query.challans && query.challans.length > 0) {
      filtered = filtered.filter((issue) =>
        query.challans?.some((challan) => challan.id === issue.challanId)
      );
    }
    setData(filtered);
  }, [query]);

  const pendingIssue = useReactTable<ChallanIssueModel>({
    columns,
    data: data ?? [],
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  const getClientQueryParams = (category: StockCategory): ClientQueryParams => {
    if (
      category.key === "OUTWARD" ||
      category.key === "DESIGN" ||
      category.key === "DELIVERED"
    ) {
      return {
        category: [new ClientCategory("INWARD_PARTY")],
      };
    }
    return {
      category: [new ClientCategory(`${category.key}_PARTY`)],
    };
  };

  return (
    <div className={`${className} space-y-4`}>
      <div className="flex flex-wrap gap-y-2 gap-x-4">
        <Button
          type="reset"
          variant="outline"
          icon={<ArrowPathRoundedSquareIcon width={"20px"} height={"20px"} />}
          text=""
        />
        <div className="flex items-center px-3 py-1 bg-white rounded-md border">
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
          <Button
            type="reset"
            variant="vanilla"
            tooltip="Match Exact"
            className={`text-gray-600 ${
              query.exact ? "!bg-primary-100" : "bg-transparent"
            } hover:bg-primary-50 !p-1`}
            onClick={() => setQuery({ exact: !query.exact })}
            icon={<LetterCaseCapitalizeIcon width={"16px"} height={"16px"} />}
            text=""
          />
        </div>

        <ChallanSelector
          selected={query.challans ?? []}
          onSelect={(challan: ChallanListModel) => {
            if (!challan) {
              setQuery({
                challans: [],
              });
              return;
            }

            if (!query.challans) {
              setQuery({
                challans: [challan],
              });
            } else if (
              query.challans.findIndex((e) => e.id == challan.id) !== -1
            ) {
              setQuery({
                challans: query.challans?.filter((c) => c.id !== challan.id),
              });
            } else {
              setQuery({
                challans: [...query?.challans, challan],
              });
            }
          }}
          query={{
            cursor: 0,
            category: [category],
            issuePending: true,
          }}
          onClear={() => setQuery({ challans: [] })}
        />

        <ClientSelector
          selected={query.clients ?? []}
          onSelect={(client: ClientModel) => {
            if (!client) {
              setQuery({
                clients: [],
              });
              return;
            }

            if (!query.clients) {
              setQuery({
                clients: [client],
              });
            } else if (
              query.clients.findIndex((e) => e.id == client.id) !== -1
            ) {
              setQuery({
                clients: query.clients?.filter((c) => c.id !== client.id),
              });
            } else {
              setQuery({
                clients: [...query?.clients, client],
              });
            }
          }}
          query={category ? getClientQueryParams(category) : {}}
          onClear={() => setQuery({ clients: [] })}
        />
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
      <TanStackTable<ChallanIssueModel>
        table={pendingIssue}
        customHeading={
          <h2 className="text-lg font-medium pl-8 pt-4 pb-2">
            Jobwork Stocks To Issue
          </h2>
        }
        cellClassName="px-8"
      />
    </div>
  );
};
