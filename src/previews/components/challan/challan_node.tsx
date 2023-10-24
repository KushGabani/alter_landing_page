import { Handle, type NodeProps, Position } from "reactflow";
import moment from "moment";

import { Tag } from "../global";
import { ChallanListModel } from "../../models";
import { useSelectedNode } from "../../hooks/use_selected_node";

export const ChallanNode = ({ data: challan }: NodeProps<ChallanListModel>) => {
  const { selectedId, setSelectedId } = useSelectedNode();
  return (
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
            challan.id === selectedId ? "border border-primary-400" : "border"
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
  );
};
