import { useState } from "react";
import { DesignModel, StockModel, StocktypeModel } from "../../models";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { BaseSelectField, Tag } from "../global";
import { type StockQueryParams } from "../../models/stock/stock_model";
import { stocks } from "../../data/stock";

type Props<MultiSelect> = {
  label: string;
  query: StockQueryParams;
  design?: DesignModel;
  className?: string;
  selected: MultiSelect extends true ? StockModel[] : StockModel | undefined;
  focusOnMount?: boolean;
  disabled?: boolean;
  disableCreate?: boolean;
  onSelect: (stock?: StockModel) => void;
  onBlur?: (
    selected: MultiSelect extends true ? StockModel[] : StockModel | undefined
  ) => void;
  onTab?: (
    event: React.KeyboardEvent<Element>,
    direction: "tab" | "shift_tab"
  ) => void;
  error?: string;
};

export function StockSelectField<MultiSelect extends boolean = false>({
  label,
  query: initQuery,
  className,
  design,
  selected,
  onSelect,
  disabled,
  disableCreate = false,
  focusOnMount,
  error,
  onBlur,
  onTab,
}: Props<MultiSelect>) {
  initQuery = { cursor: 0, search: undefined, ...initQuery };
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [filteredStocks, setFilteredStocks] = useState(stocks);

  const renderItem = (stock: StockModel) => (
    <label className="flex-start space-x-2" htmlFor={stock.id.toString()}>
      {stock.design && (
        <Tag
          text={stock.design.code}
          style={{
            color: stock.design.status.color,
            backgroundColor: stock.design.status.backgroundColor,
          }}
        />
      )}
      <span>{stock.name}</span>
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
                text={`${e.design?.code} ${e?.name}`}
                className="bg-primary-100 text-primary-400 group-hover:bg-primary-200"
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <Tag
          text={
            selected.design
              ? `${selected?.design?.code} ${selected?.name}`
              : selected.name
          }
          className="bg-primary-100 text-primary-400 group-hover:bg-primary-200"
        />
      );
    }
  };

  const icon = <ArchiveBoxIcon width={"18px"} height={"18px"} />;

  return (
    <BaseSelectField<StockModel, MultiSelect>
      className={className}
      icon={icon}
      label={label}
      placeholder="Search Stock"
      options={filteredStocks}
      selected={selected}
      onSelect={onSelect}
      query={query}
      setQuery={(query: string | undefined) => {
        setQuery(query);
        setFilteredStocks(
          stocks.filter((stock) =>
            stock.name.toLowerCase().startsWith(query?.toLowerCase() ?? "")
          )
        );
      }}
      searchKey="name"
      disabled={disabled}
      renderItem={renderItem}
      getOptionLabel={renderSelected}
      sanitizeValue={(value) => value.replace(/[^A-Za-z0-9\-\s]/g, "")}
      focusOnMount={focusOnMount}
      onFocus={() => setQuery(undefined)}
      onTab={onTab}
      error={error}
    />
  );
}
