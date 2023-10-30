import { SerialModel } from "../../models";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Tag, BaseSelectField } from "../global";
import { type SerialQueryParams } from "../../models/stock/serial_model";
import { formatDate } from "../global/utils";
import { serials } from "../../data/serial";

type Props<MultiSelect> = {
  label: string;
  query: SerialQueryParams;
  className?: string;
  selected: MultiSelect extends true ? SerialModel[] : SerialModel | undefined;
  focusOnMount?: boolean;
  onSelect: (stock?: SerialModel) => void;
  onBlur?: (
    selected: MultiSelect extends true ? SerialModel[] : SerialModel | undefined
  ) => void;
  onTab?: (
    event: React.KeyboardEvent<Element>,
    direction: "tab" | "shift_tab"
  ) => void;
  error?: string;
};

export function SerialSelectField<MultiSelect extends boolean = false>({
  label,
  query: initQuery,
  className,
  focusOnMount,
  selected,
  onSelect,
  onBlur,
  onTab,
  error,
}: Props<MultiSelect>) {
  initQuery = {
    cursor: 0,
    search: undefined,
    includeInventoryIn: true,
    ...initQuery,
  };

  const [query, setQuery] = useState<string | undefined>(undefined);
  const [filteredSerials, setFilteredSerials] = useState(serials);

  const renderItem = (serial: SerialModel) => (
    <div className="flex items-start justify-between w-full space-x-4">
      <Tag
        text={serial.type?.name ?? serial.category.text}
        style={{
          color: serial.type ? serial.type.hex : "#0165FF",
          backgroundColor: serial.type ? `${serial.type.hex}1A` : "#0165FF1A",
        }}
      />
      {serial.inLogs && serial.category.key !== "PURCHASE" && (
        <div className="space-y-1 mt-1 flex flex-col items-start justify-start">
          {serial.inLogs
            .filter((log) => log.challan)
            .map((log) => (
              <span
                key={`serial_log_${log.id}`}
                className="text-gray-500 text-xs"
              >
                {log.challan?.challanNo} | {log.challan?.client.name} |{"  "}
                {formatDate(log.date)}
              </span>
            ))}
        </div>
      )}
      <span className="font-medium mt-1">
        {serial.qty} {serial.stock?.unit}
      </span>
    </div>
  );

  const renderSelected = () => {
    if (!selected) return <></>;

    if (Array.isArray(selected)) {
      return (
        <div className="flex space-x-1">
          {selected.map((e) => {
            return (
              <Tag
                text={`${e.type?.name ?? e.category.text}  |  ${
                  e.inLogs
                    ? `${e.inLogs[0].challan?.challanNo} | ${e.id}`
                    : e.id
                }`}
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
          text={`${selected.type?.name ?? selected.category.text}  |  ${
            selected.inLogs
              ? `${selected.inLogs[0].challan?.challanNo} | ${selected.id}`
              : selected.id
          }`}
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

  const icon = <ArchiveBoxIcon width={"18px"} height={"18px"} />;

  return (
    <BaseSelectField<SerialModel, MultiSelect>
      className={className}
      icon={icon}
      label={label}
      placeholder="Search Serial"
      options={filteredSerials}
      selected={selected}
      onSelect={onSelect}
      query={query}
      setQuery={(query: string | undefined) => {
        setQuery(query);
        setFilteredSerials(
          serials.filter((serial) =>
            serial.id.toString().startsWith(query ?? "")
          )
        );
      }}
      searchKey="id"
      getOptionLabel={renderSelected}
      renderItem={renderItem}
      sanitizeValue={(_) => ""}
      focusOnMount={focusOnMount}
      onFocus={() => setQuery(undefined)}
      onTab={onTab}
      error={error}
    />
  );
}
