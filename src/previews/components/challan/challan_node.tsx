import { Handle, type NodeProps, Position } from "reactflow";
import moment from "moment";
import * as HoverCard from "@radix-ui/react-hover-card";

import { Tag } from "../global";
import { ChallanListModel } from "../../models";
import { useSelectedNode } from "../../hooks/use_selected_node";
import { issuedItems, receivedItems } from "../../data/graph_data";

export const ChallanNode = ({ data: challan }: NodeProps<ChallanListModel>) => {
  const { selectedId, setSelectedId } = useSelectedNode();
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <div
          key={challan.id.toString()}
          onClick={() => setSelectedId(challan.id)}
          className="min-w-[14rem] flex-center"
        >
          <div className="w-fit">
            <Handle
              type="target"
              position={Position.Top}
              className="!bg-transparent !m-0"
            />
            <div
              className={`flex-start bg-white hover:bg-gray-50 shadow-sm px-4 py-2 space-x-3 rounded-md ${
                challan.id === selectedId
                  ? "border border-primary-400"
                  : "border"
              }`}
            >
              <img
                src={challan.jobStatus.icon}
                alt={`${challan.jobStatus.text} job status`}
                width={20}
                height={20}
              />
              <div className="flex flex-col items-start justify-center space-y-1">
                <div className="w-full flex space-x-4 items-center justify-between">
                  <div className="flex-start space-x-2">
                    {challan.designs.map((e) => (
                      <Tag
                        key={`design_${e.code}`}
                        className="text-xs"
                        text={e.code}
                        style={{
                          color: e.status.color,
                          backgroundColor: e.status.backgroundColor,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-[0.65rem] text-gray-400">
                    {moment(challan.issueDate).format("MM/DD/YYYY")} →{" "}
                    {moment(challan.dueDate).format("MM/DD/YYYY")}
                  </p>
                </div>
                <div className="flex-start space-x-2">
                  <h1 className="font-bold text-start text-sm">
                    {challan.challanNo}
                  </h1>
                  <p>{challan.client.name}</p>
                  {challan.type ? (
                    <Tag
                      className="text-xs"
                      text={challan.type.name}
                      style={{
                        color: challan.type?.hex,
                        backgroundColor: `${challan.type.hex}1A`,
                      }}
                    />
                  ) : (
                    <Tag
                      className="text-[0.7rem]"
                      text={challan.category.text}
                      style={{
                        color: challan.category.color,
                        backgroundColor: challan.category.backgroundColor,
                        padding: "2px 5px",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <Handle
              type="source"
              position={Position.Bottom}
              className="!bg-transparent h-0 !m-0"
            />
          </div>
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="rounded-lg w-[20rem] border border-neutral-200 bg-white p-5 shadow-lg data-[state=open]:transition-all  data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
        >
          <div className="flex flex-col gap-y-4">
            <div className="flex-start gap-x-2">
              {challan.designs.map((e) => (
                <Tag
                  key={`design_${e.code}`}
                  className="w-fit text-xs"
                  text={e.code}
                  style={{
                    color: e.status.color,
                    backgroundColor: e.status.backgroundColor,
                  }}
                />
              ))}
              <Tag
                text={challan.jobStatus.text}
                className={`bg-${challan.jobStatus.color}-washed text-${challan.jobStatus.color}`}
              />
            </div>
            {receivedItems[challan.id].length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="text-base font-medium">Received Items</span>
                {receivedItems[challan.id].map((item, index) => (
                  <div
                    key={`challan_${challan.id}_${index}`}
                    className="flex-between"
                  >
                    <div className="flex items-center gap-x-2">
                      <span className="text-sm text-slate-600">
                        {item.name}
                      </span>
                      <Tag
                        text={challan.type?.name ?? challan.category.text}
                        style={{
                          color: challan.type?.hex ?? challan.category.color,
                          backgroundColor: challan.type
                            ? `${challan.type?.hex}1A`
                            : challan.category.backgroundColor,
                        }}
                      />
                    </div>
                    <span className="text-xs text-slate-600">
                      {item.received}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {issuedItems[challan.id].length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="text-base font-medium">Issue Items</span>
                {issuedItems[challan.id].map((item, index) => (
                  <div
                    key={`challan_${challan.id}_${index}`}
                    className="flex-between"
                  >
                    <div className="flex items-center gap-x-2">
                      <span className="text-sm text-slate-600">
                        {item.name}
                      </span>
                      <Tag
                        text={item.tag}
                        className="bg-primary-100 text-primary-400"
                      />
                    </div>
                    <span className="text-xs text-slate-600">
                      {item.received}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};
