"use client";

import { BasePopoverSelector, Tag } from "../global";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ClientModel } from "../../models";
import { type ClientQueryParams } from "../../models/client/client_model";
import { clients as data } from "../../data/clients";
import { useState } from "react";

type Props = {
  triggerLabel?: string;
  selected: ClientModel[];
  onSelect: (client: ClientModel) => void;
  query: ClientQueryParams;
  onClear: () => void;
  error?: string;
};

export const ClientSelector = ({
  triggerLabel = "Party",
  selected,
  onSelect,
  query: initQuery,
  onClear,
  error,
}: Props) => {
  const [clients, setClients] = useState(data);

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

  return (
    <BasePopoverSelector<ClientModel>
      triggerLabel={
        initQuery.category &&
        initQuery.category?.length > 0 &&
        initQuery.category[0].key === "BROKER_PARTY"
          ? "Broker"
          : triggerLabel
      }
      icon={<UserCircleIcon height={"18px"} width={"18px"} />}
      searchKey="name"
      onClear={onClear}
      selected={selected}
      options={clients}
      onSelect={onSelect}
      renderItem={renderItem}
      error={error}
      setSearch={(search) =>
        setClients(
          data.filter((client) =>
            client.name.toLowerCase().startsWith(search?.toLowerCase() ?? "")
          )
        )
      }
      sanitizeValue={(value) => value.replace(/[^A-Za-z0-9\s]/g, "")}
    />
  );
};
