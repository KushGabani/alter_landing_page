"use client";

import { useEffect, useState } from "react";
import { Tag, BasePopoverSelector } from "../global";
import { StocktypeModel } from "../../models";
import { PaintBrushIcon, SwatchIcon } from "@heroicons/react/24/outline";

type Props = {
  selected: StocktypeModel[];
  onSelect: (stocktype: StocktypeModel) => void;
  onClear: () => void;
  error?: string;
};

export const StocktypeSelector = ({
  selected,
  onSelect,
  onClear,
  error,
}: Props) => {
  const stocktypes: StocktypeModel[] = [];
  const [filteredTypes, setFilteredTypes] = useState(stocktypes);

  const renderItem = (stocktype: StocktypeModel) => (
    <label
      className="text-start flex-start space-x-2"
      htmlFor={stocktype.id.toString()}
    >
      <Tag
        text={stocktype.name}
        style={{
          color: stocktype.hex,
          backgroundColor: `${stocktype.hex}1A`,
        }}
        className={"text-xs"}
      />
    </label>
  );

  return (
    <BasePopoverSelector<StocktypeModel>
      triggerLabel="Job Type"
      icon={<SwatchIcon height={"18px"} width={"18px"} />}
      searchKey="name"
      onClear={onClear}
      selected={selected}
      options={filteredTypes}
      onSelect={onSelect}
      renderItem={renderItem}
      error={error}
      setSearch={(search) =>
        setFilteredTypes(
          stocktypes.filter((e) =>
            e.name.toLowerCase().startsWith(search?.toLowerCase().trim() ?? "")
          )
        )
      }
      sanitizeValue={(value) => value.replace(/[^A-Za-z0-9\s]/g, "")}
    />
  );
};
