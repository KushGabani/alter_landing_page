import moment from "moment";

import { createColumnHelper } from "@tanstack/react-table";
import { ChallanExpectModel, CreateChallanInspectModel } from "../../models";
import { Tag, TriggerButton, BasePopoverForm } from "../global";
import { numberFormatter } from "../global/utils";
import { ProcessReceiveithFormContext } from "../../components/challan/receive_form";
import { JobStatus } from "../../models/types";
import { PlusIcon } from "@heroicons/react/24/outline";
import { DialogFormProvider } from "../../hooks/use_dialog_form";

export const columnMap = {
  challanId: "Challan No.",
  jobtype: "Job Type",
  jobStatus: "Receive Status",
  client: "Party",
  stock: "Stock",
  qty: "Qty",
};

export const useExpectationTableColumns = () => {
  const columnHelper = createColumnHelper<ChallanExpectModel>();

  return [
    columnHelper.accessor("stock", {
      header: () => columnMap.stock,
      cell: (info) => {
        const stock = info.getValue();
        return (
          <div className="font-medium py-1 hover:text-black hover:underline">
            {stock.name}
          </div>
        );
      },
    }),
    columnHelper.accessor("challan", {
      header: () => columnMap.challanId,
      cell: (info) => {
        const challan = info.getValue();
        return (
          <div className="flex-center gap-x-4 p-1 ">
            <div className="font-medium p-1  hover:text-black hover:underline">
              {challan?.challanNo}
            </div>
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
        <div className="font-medium py-1  hover:text-black hover:underline">
          {info.getValue().name}
        </div>
      ),
    }),
    columnHelper.display({
      id: "Receive",
      header: () => <div className="text-start pl-6">Receive</div>,
      cell: (props) => {
        const pending =
          props.row.original.qty - props.row.original.inspectedQty;
        const status: JobStatus =
          pending === 0
            ? new JobStatus("COMPLETE")
            : pending === props.row.original.qty
            ? new JobStatus("IN_PROCESS")
            : new JobStatus("PART_RECEIVED");

        const expectItems = [
          {
            expect: props.row.original,
            date: moment().startOf("day").toDate(),
          },
        ];
        return (
          <DialogFormProvider<CreateChallanInspectModel>
            defaultValues={{
              challan: props.row.original.challan,
              expectItems,
            }}
          >
            <BasePopoverForm
              trigger={
                <TriggerButton
                  text={`${numberFormatter(pending)} ${
                    props.row.original.stock.unit
                  }`}
                  tooltip={
                    props.row.original.challan?.category.key == "OUTWARD"
                      ? "Mark as delivered"
                      : "Receive"
                  }
                  icon={<PlusIcon width={18} height={18} />}
                  variant="solid"
                  className="!bg-primary-50 !text-primary-400 !hover:bg-primary-100 text-xs my-2"
                />
              }
              children={
                <ProcessReceiveithFormContext
                  challan={props.row.original.challan}
                  expectItems={expectItems}
                />
              }
            />
          </DialogFormProvider>
        );
      },
    }),
  ];
};
