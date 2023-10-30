"use client";

import { ClientModel } from "../../models";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Tag, BaseSelectField } from "../global";
import { clients } from "../../data/clients";
import { ClientCategory } from "../../models/types";
import { type ClientQueryParams } from "../../models/client/client_model";
import { useState } from "react";

type Props<MultiSelect> = {
  label: string;
  category: ClientCategory;
  query: ClientQueryParams;
  className?: string;
  selected: MultiSelect extends true ? ClientModel[] : ClientModel | undefined;
  disabled?: boolean;
  focusOnMount?: boolean;
  onSelect: (client?: ClientModel) => void;
  onBlur?: (
    selected: MultiSelect extends true ? ClientModel[] : ClientModel | undefined
  ) => void;
  onTab?: (
    event: React.KeyboardEvent<Element>,
    direction: "tab" | "shift_tab"
  ) => void;
  error?: string;
};

export function ClientSelectField<MultiSelect extends boolean = false>({
  label,
  category,
  query: initQuery,
  className,
  disabled,
  focusOnMount,
  selected,
  onSelect,
  onBlur,
  onTab,
  error,
}: Props<MultiSelect>) {
  const [filteredClients, setFilteredClients] =
    useState<ClientModel[]>(clients);
  const [query, setQuery] = useState<string | undefined>(undefined);

  const renderItem = (client: ClientModel, query?: string) => (
    <label
      className="text-start flex-start space-x-2"
      htmlFor={client.id.toString()}
    >
      <div>
        <span className="font-semibold">
          {client.name.substring(0, query?.length ?? 0)}
        </span>
        <span>{client.name.substring(query?.length ?? 0)}</span>
      </div>
      <Tag
        text={client.category.text}
        style={{
          color: client.category.color,
          backgroundColor: client.category.backgroundColor,
        }}
        className={"text-xs"}
      />
    </label>
  );

  const renderSelected = (): JSX.Element => {
    if (!selected) return <></>;

    if (Array.isArray(selected)) {
      return (
        <div className="flex space-x-1">
          {selected.map((e) => {
            return (
              <Tag
                text={e.name}
                style={{
                  color: e.category.color,
                  backgroundColor: e.category.backgroundColor,
                }}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <Tag
          text={selected.name}
          style={{
            color: selected.category.color,
            backgroundColor: selected.category.backgroundColor,
          }}
        />
      );
    }
  };

  const icon = <UserCircleIcon width={"18px"} height={"18px"} />;

  return (
    <BaseSelectField<ClientModel, MultiSelect>
      className={className}
      icon={icon}
      label={label}
      placeholder="Search Party"
      options={filteredClients}
      selected={selected}
      onSelect={onSelect}
      query={query}
      setQuery={(query: string | undefined) => {
        setQuery(query);
        setFilteredClients(
          clients.filter((client) =>
            client.name.toLowerCase().startsWith(query?.toLowerCase() ?? "")
          )
        );
      }}
      renderItem={renderItem}
      getOptionLabel={renderSelected}
      searchKey={"name"}
      disabled={disabled}
      focusOnMount={focusOnMount}
      sanitizeValue={(value) => value.replace(/[^A-Za-z0-9\s]/g, "")}
      onFocus={() => setQuery(undefined)}
      onTab={onTab}
      error={error}
    />
  );
}
