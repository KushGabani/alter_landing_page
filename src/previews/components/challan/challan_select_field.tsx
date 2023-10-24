import React, { useState } from "react";
import { ChallanListModel } from "../../models";
import { Tag, BaseSelectField } from "../global";
import { TicketIcon } from "@heroicons/react/24/outline";
import { type ChallanQueryParams } from "../../models/challan/challan_model";
import { challans as data } from "../../data/challan";
import { formatDate } from "../global/utils";

type Props<MultiSelect> = {
  label: string;
  query: ChallanQueryParams;
  className?: string;
  focusOnMount?: boolean;
  disabled?: boolean;
  selected: MultiSelect extends true
    ? ChallanListModel[]
    : ChallanListModel | undefined;
  onSelect: (challan?: ChallanListModel) => void;
  onBlur?: (
    selected: MultiSelect extends true
      ? ChallanListModel[]
      : ChallanListModel | undefined
  ) => void;
  onTab?: (
    event: React.KeyboardEvent<Element>,
    direction: "tab" | "shift_tab"
  ) => void;
  error?: string;
};

export function ChallanSelectField<MultiSelect extends boolean = false>({
  label,
  query: initQuery,
  className,
  focusOnMount,
  disabled,
  selected,
  onSelect,
  onBlur,
  onTab,
  error,
}: Props<MultiSelect>) {
  const [challans, setChallans] = useState(data);
  const renderItem = (challan: ChallanListModel) => (
    <label className="space-y-1" htmlFor={challan.id.toString()}>
      <div className="flex-start space-x-2">
        <span>{challan.challanNo}</span>
        <span>{challan.client.name}</span>
        <Tag
          text={challan.category.text}
          style={{
            color: challan.category.color,
            backgroundColor: challan.category.backgroundColor,
          }}
          className={"text-xs"}
        />
      </div>
      {challan.mainChallans &&
        challan.mainChallans.length > 0 &&
        (challan.mainChallans.length > 3
          ? challan.mainChallans.splice(0, 3)
          : challan.mainChallans
        ).map((e) => (
          <span
            key={`mainchallan_${e.id}`}
            className="text-gray-500 text-xs flex gap-x-1"
          >
            <span>{e.challanNo}</span>
            {e.clientChallanId && <span>/{e.clientChallanId}</span>} |
            <span>{e.client.name}</span> |<span>{formatDate(e.issueDate)}</span>
          </span>
        ))}
    </label>
  );

  const renderSelected = () => {
    if (!selected) return <></>;

    if (Array.isArray(selected)) {
      return (
        <div className="flex space-x-1">
          {selected.map((e) => {
            return (
              <Tag
                key={`challan_${e.id}`}
                text={e.challanNo}
                style={{
                  color: e.type?.hex ?? e.category.color,
                  backgroundColor: e.type
                    ? `${e.type.hex}1A`
                    : e.category.backgroundColor,
                }}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <Tag
          text={selected.challanNo}
          style={{
            color: selected.type?.hex ?? selected.category.color,
            backgroundColor: selected.type
              ? `${selected.type.hex}1A`
              : selected.category.backgroundColor,
          }}
        />
      );
    }
  };

  const icon = <TicketIcon width={"18px"} height={"18px"} />;

  return (
    <BaseSelectField<ChallanListModel, MultiSelect>
      className={className}
      icon={icon}
      label={label}
      placeholder="Select Challan"
      options={challans}
      focusOnMount={focusOnMount}
      disabled={disabled}
      selected={selected}
      onSelect={onSelect}
      setQuery={(query?: string) => {
        setChallans(
          challans.filter((challan) =>
            challan.challanNo
              .toLowerCase()
              .startsWith(query?.toLowerCase() ?? "")
          )
        );
      }}
      searchKey="challanNo"
      renderItem={renderItem}
      getOptionLabel={renderSelected}
      onBlur={() => {
        setChallans(data);
        if (onBlur) onBlur(selected);
      }}
      onTab={onTab}
      error={error}
    />
  );
}
