import { Tag, BasePopoverSelector } from "../global";
import { PaintBrushIcon } from "@heroicons/react/24/outline";
import { DesignModel } from "../../models";
import { type DesignQueryParams } from "../../models/design/design_model";
import { designs as data } from "../../data/design";
import { useState } from "react";

type Props = {
  selected: DesignModel[];
  onSelect: (design: DesignModel) => void;
  query: DesignQueryParams;
  onClear: () => void;
  error?: string;
};

export const DesignSelector = ({
  selected,
  onSelect,
  query: initQuery,
  onClear,
  error,
}: Props) => {
  const [designs, setDesigns] = useState(data);
  const renderItem = (design: DesignModel, query?: string) => (
    <label
      className="text-start flex-start space-x-2"
      htmlFor={design.id.toString()}
    >
      <Tag
        text={design.code}
        style={{
          color: design.status.color,
          backgroundColor: design.status.backgroundColor,
        }}
        className={"text-xs"}
      />
    </label>
  );

  return (
    <BasePopoverSelector<DesignModel>
      triggerLabel="Design"
      icon={<PaintBrushIcon height={"18px"} width={"18px"} />}
      searchKey="code"
      onClear={onClear}
      selected={selected}
      options={designs}
      onSelect={onSelect}
      renderItem={renderItem}
      error={error}
      setSearch={(search) =>
        search &&
        setDesigns(designs.filter((design) => design.code.search(search)))
      }
      sanitizeValue={(value) => value.replace(/[^A-Za-z0-9\s]/g, "")}
    />
  );
};
