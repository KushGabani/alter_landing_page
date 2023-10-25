import { Tag, BasePopoverSelector } from "../global";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { ChallanListModel } from "../../models";
import { type ChallanQueryParams } from "../../models/challan/challan_model";
import { useState } from "react";
import { challans as data } from "../../data/challan";

type Props = {
  triggerLabel?: string;
  selected: ChallanListModel[];
  onSelect: (challan: ChallanListModel) => void;
  query: ChallanQueryParams;
  onPopoverOpenChange?: (open: boolean) => void;
  onClear: () => void;
  error?: string;
};

export const ChallanSelector = ({
  triggerLabel = "Challan",
  selected,
  onSelect,
  query: initQuery,
  onPopoverOpenChange,
  onClear,
  error,
}: Props) => {
  const [challans, setChallans] = useState(data);

  const renderItem = (challan: ChallanListModel, query?: string) => (
    <label
      className="text-start flex-start space-x-2"
      htmlFor={challan.id.toString()}
    >
      <div>
        <span className="font-semibold">{challan.challanNo}</span>
      </div>
      <Tag
        text={challan.category.text}
        style={{
          color: challan.category.color,
          backgroundColor: challan.category.backgroundColor,
        }}
        className={"text-xs"}
      />
      {challan.type && (
        <Tag
          text={challan.type.name}
          style={{
            color: challan.type.hex,
            backgroundColor: `${challan.type.hex}1A`,
          }}
        />
      )}
    </label>
  );

  return (
    <BasePopoverSelector<ChallanListModel>
      triggerLabel={triggerLabel}
      icon={<DocumentTextIcon height={"18px"} width={"18px"} />}
      searchKey="challanNo"
      onClear={onClear}
      selected={selected}
      options={challans}
      onSelect={onSelect}
      renderItem={renderItem}
      error={error}
      setSearch={(search) =>
        setChallans(
          data.filter((challan) =>
            challan.challanNo
              .toLowerCase()
              .startsWith(search?.toLowerCase() ?? "")
          )
        )
      }
      sanitizeValue={(value) => value.replace(/[^A-Za-z0-9-.\s]/g, "")}
    />
  );
};
