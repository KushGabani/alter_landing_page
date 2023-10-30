import {
  ChevronDownIcon,
  HashtagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { type UseFormRegisterReturn } from "react-hook-form";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Checkbox from "@radix-ui/react-checkbox";
import { StockCategory } from "../../models/types";
import { Loading, Tag } from "../global";
import { ChallanSeriesModel, StocktypeModel } from "../../models";
import { useEffect } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { series } from "../../data/challan_series";

type Props = {
  className?: string;
  error?: string;
  selected?: ChallanSeriesModel;
  onSelect: (
    series: ChallanSeriesModel,
    checked: Checkbox.CheckedState
  ) => void;
  fetchDefault?: boolean;
  category?: StockCategory;
  type?: StocktypeModel;
  inputProps?: UseFormRegisterReturn;
  focusOnMount?: boolean;
};

export const ChallanSeriesField = ({
  className,
  error,
  selected,
  onSelect,
  inputProps,
  category,
  type,
  focusOnMount,
  fetchDefault = true,
}: Props) => {
  useEffect(() => {
    const fetchDefaultSeries = async () => {
      if (series.length > 0) {
        if (type) {
          const typeSeries = series.find((e) => e.type && e.type.id == type.id);
          if (typeSeries) {
            onSelect(typeSeries, true);
            return;
          }
        }
        const defSeries = series.find((e) => e.type === undefined);
        if (defSeries) onSelect(defSeries, true);
      }
    };

    if (type && fetchDefault) fetchDefaultSeries();
  }, [type]);

  const _buildSeries = (series: ChallanSeriesModel): string => {
    return `${
      series.prefix.length > 0
        ? `${series.prefix}-${series.number}`
        : series.number
    }${series.suffix && series.suffix.length > 0 ? `-${series.suffix}` : ""}`;
  };

  return !selected ? (
    <div className={`relative space-y-1 ${className}`}>
      <DropdownMenu.Root>
        <label
          htmlFor="challanNo"
          className="text-xs text-gray-500 whitespace-nowrap"
        >
          Challan No.
        </label>
        <div className="flex h-10 items-center bg-white">
          <div className="rounded-l-md h-full flex-start flex-grow border border-r-0 shadow-sm focus-within:ring-1 focus-within:ring-primary-600">
            <div className="flex items-center bg-white rounded-md">
              <div className="px-3 border-r-[1px] border-gray-300">
                {
                  <HashtagIcon
                    width={"15px"}
                    height={"15px"}
                    className="text-gray-600"
                  />
                }
              </div>
              <input
                aria-invalid={error ? "true" : "false"}
                {...inputProps}
                autoFocus={focusOnMount}
                type={"text"}
                className="block w-full focus:outline-none bg-transparent py-1 px-3 text-primary-800 disabled:bg-gray-100 disabled:border-gray-600 rounded-l-md sm:text-sm"
              />
            </div>
          </div>
          <DropdownMenu.Trigger className="px-2 h-full flex-center rounded-r-md border shadow-sm focus-within:ring-1 focus-within:ring-primary-600">
            <ChevronDownIcon width={"18px"} height={"18px"} />
          </DropdownMenu.Trigger>
        </div>
        {error && (
          <div role="alert" className="flex text-red text-xs space-x-1 mt-1">
            <span>*</span>
            <span>{error}</span>
          </div>
        )}
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="DropdownMenuContent min-w-fit"
            align="end"
            sideOffset={5}
          >
            <Loading isLoading={false}>
              {series && series.length > 0 ? (
                <div>
                  {series.map((e) => {
                    return (
                      <DropdownMenu.CheckboxItem
                        key={`series_${e.id}`}
                        onKeyDown={(event) =>
                          event.key === "Enter" && onSelect(e, !true)
                        }
                        onCheckedChange={(check) => onSelect(e, check)}
                        checked={false}
                        className="DropdownMenuItem w-full flex-start space-x-2"
                      >
                        <CheckIcon
                          className={`flex-center rounded-[0.3rem] p-[2px] w-4 h-4 text-white border border-gray-300 bg-gray-50`}
                        />
                        <div className="flex-start space-x-2">
                          <span>{_buildSeries(e)}</span>
                          {e.type ? (
                            <Tag
                              text={e.type.name}
                              style={{
                                color: e.type.hex,
                                backgroundColor: `${e.type.hex}1A`,
                              }}
                              className={"text-xs"}
                            />
                          ) : (
                            <Tag
                              text={e.category.text}
                              style={{
                                color: e.category.color,
                                backgroundColor: e.category.backgroundColor,
                              }}
                              className={"text-xs"}
                            />
                          )}
                        </div>
                      </DropdownMenu.CheckboxItem>
                    );
                  })}
                </div>
              ) : (
                <h3 className="w-full text-center p-6 text-gray-500 font-medium">
                  No Series Found
                </h3>
              )}
            </Loading>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  ) : (
    <div className={`space-y-1`}>
      <label
        htmlFor="challanNo"
        className="text-xs text-gray-500 whitespace-nowrap"
      >
        Challan No.
      </label>
      <div className="flex-center h-[2.35rem]">
        <div
          className={`group flex px-3 py-2 flex-center border border-r-0 focus-within:ring-1 focus-within:ring-primary-600 rounded-l-md bg-white space-x-1 text-sm text-gray-500 shadow-sm`}
        >
          {selected.prefix.length > 0 && (
            <>
              <input
                type="text"
                name="challanNo"
                maxLength={2}
                disabled={true}
                value={selected.prefix}
                autoComplete="false"
                className="w-12 text-center focus:outline-none disabled:bg-white text-gray-600"
              />
              <span>-</span>
            </>
          )}
          <input
            type="text"
            name="month"
            {...inputProps}
            autoFocus={focusOnMount}
            autoComplete="false"
            placeholder="#"
            className="w-12 text-center focus:outline-none text-gray-600"
          />
          {selected.suffix && (
            <>
              <span>-</span>
              <input
                type="text"
                name="year"
                aria-invalid={error ? "true" : "false"}
                maxLength={4}
                value={selected.suffix}
                disabled={true}
                autoComplete="false"
                className="w-12 focus:outline-none disabled:bg-white text-gray-600"
              />
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => onSelect(selected, false)}
          className="px-2 h-full flex-center rounded-r-md border shadow-sm focus-within:ring-1 focus-within:ring-primary-600"
        >
          <XMarkIcon width={"18px"} height={"18px"} />
        </button>
      </div>
      {error && (
        <div role="alert" className="flex text-red text-xs space-x-1 mt-1">
          <span>*</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
