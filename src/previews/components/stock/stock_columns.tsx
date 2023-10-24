import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { StockModel } from "../../models";
import { Tag } from "../global";
import { numberFormatter } from "../global/utils";

export const columnMap = {
  name: "Name",
  category: "Category",
  type: "Job type",
  tag: "Tag",
  unit: "Unit",
  hsn: "HSN Code",
  file: "File",
  minimum: "Minimum",
  count: "No. Of Items",
};

export const useStockColumns = () => {
  const columnHelper = createColumnHelper<StockModel>();
  const columns = [
    columnHelper.display({
      id: "design_name",
      header: () => <div className="text-start">Name</div>,
      cell: (props) => {
        return (
          <div className="flex-start flex-wrap gap-x-2 gap-y-2 py-1 ">
            {props.row.original.design && (
              <Tag
                key={`stock_design_${props.row.original.design.id}`}
                text={props.row.original.design.code}
                style={{
                  color: props.row.original.design.status.color,
                  backgroundColor:
                    props.row.original.design.status.backgroundColor,
                }}
              />
            )}
            <p className="font-medium text-black hover:underline">
              {props.row.original.name}
            </p>
          </div>
        );
      },
    }),
    columnHelper.accessor((row) => row.serialCount ?? 0, {
      id: columnMap.count,
      header: () => <div className="text-center">{"No. Of Items"}</div>,
      cell: (info) => (
        <div className="flex-center">
          <Tag
            text={`${numberFormatter(info.getValue())} ITEMS`}
            style={{
              width: "fit-content",
              color: "white",
              backgroundColor: "#7E56D8",
            }}
          />
        </div>
      ),
      enableHiding: false,
      enableSorting: true,
    }),
    columnHelper.display({
      id: "qty",
      header: () => <div className="text-start">Total Quantity</div>,
      cell: (props) => (
        <div className="flex-start flex-wrap gap-x-2 gap-y-2">
          <span>{props.row.original.serialQty}</span>
          <span className="font-medium text-black">
            {props.row.original.unit}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("hsn", {
      header: () => columnMap.hsn,
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      enableHiding: true,
    }),
    columnHelper.accessor("minimum", {
      header: () => columnMap.minimum,
      cell: (info) =>
        info.getValue() && (
          <div className="text-center">
            {numberFormatter(info.getValue()!.toString())}
          </div>
        ),
      enableHiding: true,
    }),
  ];
  return columns.filter((e) => e !== undefined) as ColumnDef<StockModel, any>[];
};
