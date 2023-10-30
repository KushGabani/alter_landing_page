import { StocktypeModel, CreateStocktypeModel } from "../../models";
import React, { useState } from "react";
import { stocktypes } from "../../data/stocktype";
import { Tag, BaseDialogForm, BaseSelectField } from "../global/";
import { SwatchIcon } from "@heroicons/react/24/outline";

type Props<MultiSelect> = {
  label: string;
  className?: string;
  focusOnMount?: boolean;
  selected: MultiSelect extends true
    ? StocktypeModel[]
    : StocktypeModel | undefined;
  onSelect: (stocktype?: StocktypeModel) => void;
  onBlur?: (
    selected: MultiSelect extends true
      ? StocktypeModel[]
      : StocktypeModel | undefined
  ) => void;
  onTab?: (
    event: React.KeyboardEvent<Element>,
    direction: "tab" | "shift_tab"
  ) => void;
  error?: string;
};

export function StocktypeSelectField<MultiSelect extends boolean = false>({
  label,
  className,
  selected,
  focusOnMount,
  onSelect,
  onTab,
  onBlur,

  error,
}: Props<MultiSelect>) {
  const [filteredTypes, setFilteredTypes] =
    useState<StocktypeModel[]>(stocktypes);
  const [search, setSearch] = useState("");

  const renderItem = (stocktype: StocktypeModel) => (
    <label
      className="text-start flex space-x-2"
      htmlFor={stocktype.id.toString()}
    >
      <Tag
        text={stocktype.name}
        style={{ backgroundColor: `${stocktype.hex}1A`, color: stocktype.hex }}
        className="text-white text-xs"
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
                  color: e.hex,
                  backgroundColor: `${e.hex}1A`,
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
            color: selected.hex,
            backgroundColor: `${selected.hex}1A`,
          }}
        />
      );
    }
  };

  const icon = <SwatchIcon width={18} height={18} />;

  return (
    <BaseSelectField<StocktypeModel, MultiSelect>
      className={className}
      icon={icon}
      label={label}
      placeholder="Search Jobtype"
      options={filteredTypes}
      selected={selected}
      onSelect={onSelect}
      focusOnMount={focusOnMount}
      isFetching={false}
      renderItem={renderItem}
      getOptionLabel={renderSelected}
      searchKey="name"
      query={search}
      setQuery={(query: string | undefined) => {
        if (!query) return setFilteredTypes(stocktypes);
        setSearch(query);
        setFilteredTypes(
          stocktypes.filter((e) =>
            e.name.toLowerCase().startsWith(query.toLowerCase())
          )
        );
      }}
      sanitizeValue={(value) => value.replace(/[^A-Za-z0-9\s]/g, "")}
      onBlur={() => onBlur && onBlur(selected)}
      onTab={() => onTab}
      error={error}
    />
  );
}
