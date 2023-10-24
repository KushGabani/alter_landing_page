import { createColumnHelper } from "@tanstack/react-table";
import { ChallanIssueModel } from "../../models";
import { Button, Tag } from "../global";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export const columnMap = {
  challanNo: "Challan No.",
  jobtype: "Job Type",
  client: "Party",
  stock: "Stock",
  qty: "Qty",
};

export const useIssueTableColumns = () => {
  const columnHelper = createColumnHelper<ChallanIssueModel>();

  return [
    columnHelper.accessor("serial.stock", {
      header: () => columnMap.stock,
      cell: (info) => {
        const stock = info.getValue();
        return stock ? (
          <div className="font-medium py-1 hover:text-black hover:underline">
            {stock.name}
          </div>
        ) : (
          "-"
        );
      },
    }),
    columnHelper.accessor("challan", {
      header: () => columnMap.challanNo,
      cell: (info) => {
        const challan = info.getValue();
        return (
          <div className="flex-center gap-x-4">
            <span className="font-medium p-1 hover:text-black hover:underline">
              {challan?.challanNo}
            </span>
            {challan?.category.key !== "OUTWARD" ? (
              challan?.type ? (
                <Tag
                  text={challan.type.name}
                  style={{
                    color: challan.type.hex,
                    backgroundColor: `${challan.type.hex}1A`,
                  }}
                />
              ) : (
                <Tag
                  text={challan?.category.text ?? ""}
                  style={{
                    color: challan?.category.color,
                    backgroundColor: challan?.category.backgroundColor,
                  }}
                />
              )
            ) : (
              <></>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor("challan.client", {
      header: () => <div className="w-full text-start">{columnMap.client}</div>,
      cell: (info) => (
        <div className="font-medium p-1  hover:text-black hover:underline">
          {info.getValue()?.name}
        </div>
      ),
    }),
    columnHelper.display({
      id: "Issue",
      header: () => <div className="text-start pl-6">Issue</div>,
      cell: (props) => (
        <Button
          variant="solid"
          type="button"
          text={
            props.row.original.qty.toString() +
            " " +
            props.row.original.serial.stock?.unit
          }
          icon={<ArrowUpTrayIcon width={18} height={18} />}
          className="!bg-primary-50 !text-primary-400 !hover:bg-primary-100 text-xs my-2 space-x-3"
        />
      ),
    }),
  ];
};
