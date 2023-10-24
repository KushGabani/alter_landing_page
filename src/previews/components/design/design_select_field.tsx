import { PaintBrushIcon } from "@heroicons/react/24/outline";
import { DialogFormProvider } from "../../hooks/use_dialog_form";
import {
  CreateDesignModel,
  DesignModel,
  type DesignQueryParams,
} from "../../models/design/design_model";
import { DesignStatus } from "../../models/types";
import { Tag, BaseSelectField, BaseDialogForm } from "../global";
import { designs as data } from "../../data/design";
import { useState } from "react";

type Props<MultiSelect> = {
  className?: string;
  label: string;
  query: DesignQueryParams;
  status?: DesignStatus;
  focusOnMount?: boolean;
  selected: MultiSelect extends true ? DesignModel[] : DesignModel | undefined;
  disabled?: boolean;
  onSelect: (design?: DesignModel) => void;
  onBlur?: (
    selected: MultiSelect extends true ? DesignModel[] : DesignModel | undefined
  ) => void;
  onTab?: (
    event: React.KeyboardEvent<Element>,
    direction: "tab" | "shift_tab"
  ) => void;
  error?: string;
};

export function DesignSelectField<MultiSelect extends boolean = false>({
  className,
  label,
  query: initQuery,
  status = new DesignStatus("COMPLETE"),
  focusOnMount,
  selected,
  disabled,
  onSelect,
  onBlur,
  onTab,
  error,
}: Props<MultiSelect>) {
  const [designs, setDesigns] = useState(data);
  const renderItem = (design: DesignModel, query?: string) => (
    <label
      className="text-start flex-start space-x-2"
      htmlFor={design.id.toString()}
    >
      <div>
        <span className="font-semibold">
          {design.code.substring(0, query?.length ?? 0)}
        </span>
        <span>{design.code.substring(query?.length ?? 0)}</span>
      </div>
      <Tag
        text={design.status.key}
        style={{
          color: design.status.color,
          backgroundColor: design.status.backgroundColor,
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
                key={`select_design_${e.id}`}
                text={e.code}
                style={{
                  color: e.status.color,
                  backgroundColor: e.status.backgroundColor,
                }}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <Tag
          text={selected.code}
          style={{
            color: selected.status.color,
            backgroundColor: selected.status.backgroundColor,
          }}
        />
      );
    }
  };

  const icon = <PaintBrushIcon width={"18px"} height={"18px"} />;

  return (
    <DialogFormProvider<CreateDesignModel>
      defaultValues={{ status: new DesignStatus("COMPLETE") }}
    >
      <BaseSelectField<DesignModel, MultiSelect>
        className={className}
        icon={icon}
        label={label}
        placeholder="Search Design"
        options={designs}
        selected={selected}
        onSelect={onSelect}
        setQuery={(query: string | undefined) => {
          setDesigns(
            data.filter((design) => design.code.startsWith(query ?? ""))
          );
        }}
        isFetching={false}
        renderItem={renderItem}
        getOptionLabel={renderSelected}
        searchKey="code"
        disabled={disabled}
        focusOnMount={focusOnMount}
        sanitizeValue={(value) => value.replace(/[^A-Za-z0-9\-\s]/g, "")}
        onBlur={() => {
          if (onBlur) onBlur(selected);
          setDesigns(data);
        }}
        onTab={onTab}
        error={error}
      />
    </DialogFormProvider>
  );
}
