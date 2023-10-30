import moment from "moment";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import {
  CreateChallanModel,
  SerialModel,
  StockModel,
  CreateChallanIssueWithChallan,
} from "../../models";
import { BasePopoverSelector, Button, InputField } from "../global";
import {
  JobStatus,
  SerialStatus,
  StockCategory,
  DesignStatus,
} from "../../models/types";
import {
  ArrowDownOnSquareStackIcon,
  CogIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StockSelectField } from "../stock/stock_select_field";
import { SerialSelectField } from "../stock/serial_select_field";
import { ChallanSelector } from "./challan_selector";
import {
  numberFormatter,
  parseFormattedNumber,
  onlyUniqueObjects,
} from "../global/utils";
import { DesignSelector } from "../design/design_selector";

export const CreateChallanIssueForm = () => {
  const today = moment().startOf("day").toDate();
  const {
    control,
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<CreateChallanModel>();

  const category = getValues("category");

  const { fields, append, remove } = useFieldArray<CreateChallanModel>({
    name: "issue",
    rules: {
      required:
        category.key !== "PURCHASE" && category.key !== "INWARD"
          ? "Please add issue materials"
          : undefined,
      validate: (issues) => {
        const isSeen: number[] = [];
        for (const issue of issues as CreateChallanIssueWithChallan[]) {
          if (issue.serial && isSeen.includes(issue.serial.id)) {
            return "Duplicate Issue Stock Found";
          } else if (issue.serial) {
            isSeen.push(issue.serial.id);
          }
        }
        return undefined;
      },
    },
  });

  const fromProcess = [
    new StockCategory("PURCHASE"),
    new StockCategory("INWARD"),
    new StockCategory("JOBWORK"),
  ];

  return (
    <div className={`flex flex-col space-y-3 w-full min-w-min`}>
      <div className="flex items-center justify-between flex-wrap sm:gap-x-8 gap-x-3 gap-y-3">
        {category.key !== "OUTWARD" && category.key !== "SALES" && (
          <Controller
            render={({ field, fieldState }) => (
              <BasePopoverSelector<StockCategory>
                triggerLabel="From Process"
                icon={<CogIcon width={"18px"} height={"18px"} />}
                searchKey="text"
                onClear={() => setValue("fromProcess", undefined)}
                selected={field.value ? [field.value] : []}
                options={fromProcess}
                onSelect={(process) => {
                  setValue("fromProcess", process);
                  setValue("fromChallans", []);
                }}
                renderItem={(category: StockCategory) => (
                  <label
                    className="text-start flex-start space-x-2"
                    htmlFor={category.id.toString()}
                  >
                    <span>{category.text}</span>
                  </label>
                )}
                disableSearch={true}
              />
            )}
            control={control}
            name="fromProcess"
          />
        )}
        {watch("fromProcess")?.key !== "PURCHASE" && (
          <Controller
            render={({ field, fieldState }) => {
              const client = watch("client");
              const designs = watch("designs");
              const fromProcess = watch("fromProcess");
              return (
                <ChallanSelector
                  triggerLabel="From Challans"
                  selected={field.value}
                  query={{
                    aggregatedData: false,
                    mainChallanClient:
                      category?.key === "OUTWARD" ? client : undefined,
                    jobStatus:
                      category?.key === "OUTWARD" || category?.key === "SALES"
                        ? new JobStatus("MOVED_TO_OUTWARD")
                        : new JobStatus("READY_FOR_OUTWARD"),
                    category: fromProcess && [fromProcess!],
                    notCategory:
                      category.key == "JOBWORK"
                        ? [
                            new StockCategory("OUTWARD"),
                            new StockCategory("SALES"),
                          ]
                        : undefined,
                    includeMainChallans: true,
                    designs,
                  }}
                  onSelect={(challan) => {
                    if (!challan) {
                      setValue("fromChallans", []);
                      return;
                    }

                    if (!field.value || field.value.length < 1) {
                      setValue("fromChallans", [challan]);
                    } else if (
                      field.value.findIndex((e) => e.id == challan.id) !== -1
                    ) {
                      setValue(
                        "fromChallans",
                        field.value.filter((c) => c.id !== challan.id)
                      );
                    } else {
                      setValue("fromChallans", [...field.value, challan]);
                    }
                  }}
                  onPopoverOpenChange={(open) => {
                    if (open) return;
                    const fromChallans = watch("fromChallans");
                    if (
                      category.key === "OUTWARD" &&
                      fromChallans?.length > 0
                    ) {
                      const mainChallanIds = fromChallans.reduce<number[]>(
                        (list, e) => {
                          const inwardChallans = (e.mainChallans ?? []).filter(
                            (e) => e.category.key === "INWARD"
                          );
                          return inwardChallans.length > 0
                            ? [...list, ...inwardChallans.map((e) => e.id)]
                            : list;
                        },
                        []
                      );
                    }
                  }}
                  onClear={() => setValue("fromChallans", [])}
                />
              );
            }}
            control={control}
            name="fromChallans"
          />
        )}
        {getValues("fromProcess")?.key !== "PURCHASE" && (
          <Button
            type="button"
            variant="solid"
            className="text-xs !bg-gray-100 hover:bg-gray-200 !text-black flex-grow"
            onClick={() => {}}
            icon={<ArrowDownOnSquareStackIcon width={"18px"} height={"18px"} />}
            text="Issue From All Challans"
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-start space-y-2 flex-wrap">
        {fields.map((field, index) => {
          const designs = watch(`issue.${index}.designs`);
          const unit = watch(`issue.${index}.stock`)?.unit;
          const serial = watch(`issue.${index}.serial`);
          return (
            <div
              key={field.id}
              className="flex w-full sm:items-end sm:justify-start flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-3"
            >
              <Controller
                render={({ field }) => {
                  return (
                    <DesignSelector
                      selected={field.value}
                      query={{
                        aggregatedData: false,
                        status: new DesignStatus("COMPLETE"),
                      }}
                      onSelect={(design) => {
                        if (!design) {
                          setValue(`issue.${index}.designs`, []);
                          return;
                        }

                        if (!field.value || field.value.length < 1) {
                          setValue(`issue.${index}.designs`, [design]);
                        } else if (
                          field.value.findIndex((e) => e.id == design.id) !== -1
                        ) {
                          setValue(
                            `issue.${index}.designs`,
                            field.value.filter((c) => c.id !== design.id)
                          );
                        } else {
                          setValue(`issue.${index}.designs`, [
                            ...field.value,
                            design,
                          ]);
                        }
                      }}
                      onClear={() => setValue(`issue.${index}.designs`, [])}
                    />
                  );
                }}
                control={control}
                name={`issue.${index}.designs`}
              />
              <Controller
                render={({ field, fieldState }) => {
                  const fromProcess = getValues("fromProcess");
                  return (
                    <StockSelectField
                      label={"Stock"}
                      query={{
                        aggregatedData: false,
                        challans: watch("fromChallans"),
                        status: new SerialStatus("onlyAvailable"),
                        category:
                          category.key !== "OUTWARD" && category.key !== "SALES"
                            ? fromProcess
                              ? [fromProcess]
                              : undefined
                            : [new StockCategory("OUTWARD")],
                        notCategory: [
                          new StockCategory("DELIVERED"),
                          new StockCategory("OUTWARD"),
                        ],
                        designs,
                      }}
                      disableCreate={true}
                      selected={field.value}
                      onSelect={(stock?: StockModel) => {
                        setValue(`issue.${index}.stock`, stock);
                        setValue(`issue.${index}.serial`, undefined);
                        setValue(`issue.${index}.qty`, undefined);
                      }}
                      focusOnMount={!field.value}
                      className={"flex-grow"}
                      error={fieldState.error?.message}
                    />
                  );
                }}
                control={control}
                name={`issue.${index}.stock`}
                rules={{
                  required: "Select Stock",
                }}
              />
              {unit && (
                <>
                  <Controller
                    render={({ field, fieldState }) => {
                      const stock = watch(`issue.${index}.stock`);
                      const fromChallans = getValues("fromChallans");
                      const fromProcess = getValues("fromProcess");
                      return (
                        <SerialSelectField
                          label={"Serial"}
                          query={{
                            aggregatedData: false,
                            status: new SerialStatus("onlyAvailable"),
                            stocks: stock ? [stock] : undefined,
                            category:
                              category.key !== "OUTWARD" &&
                              category.key !== "SALES"
                                ? fromProcess
                                  ? [fromProcess]
                                  : undefined
                                : [new StockCategory("OUTWARD")],
                            notCategory: [
                              new StockCategory("DELIVERED"),
                              new StockCategory("OUTWARD"),
                            ],
                            receiveChallans: fromChallans,
                          }}
                          selected={field.value}
                          onSelect={(serial?: SerialModel) => {
                            setValue(`issue.${index}.serial`, serial);
                            setValue(`issue.${index}.qty`, serial?.qty);
                            setValue(
                              `issue.${index}.fromChallans`,
                              serial?.inLogs
                                ? onlyUniqueObjects(
                                    serial.inLogs.map((e) => e.challan)
                                  )
                                : undefined
                            );
                          }}
                          className={"flex-grow"}
                          error={fieldState.error?.message}
                        />
                      );
                    }}
                    control={control}
                    name={`issue.${index}.serial`}
                    rules={{
                      required: "Select Serial",
                    }}
                  />
                  <InputField
                    label="Qty"
                    placeholder="0.0"
                    suffix={
                      unit ? (
                        <div className="flex w-fit items-center justify-start space-x-2">
                          {serial && (
                            <div className="flex-center space-x-1">
                              <span className="text-xs text-gray-400 font-medium">
                                /
                              </span>
                              <span className="text-xs text-gray-400 font-medium">
                                {serial.qty}
                              </span>
                            </div>
                          )}
                          <div className="px-3 py-3 rounded-r-md h-full text-xs bg-primary-100 text-primary-400">
                            {unit}
                          </div>
                        </div>
                      ) : undefined
                    }
                    inputProps={register(`issue.${index}.qty`, {
                      required: "Required",
                      valueAsNumber: true,
                      validate: (value) => {
                        if (value === 0) return "Cannot be 0";
                        if (serial && value! > serial.qty)
                          return "Cannot be more than available quantity";
                      },
                      onBlur: (event) => {
                        const num = parseFormattedNumber(event.target.value);
                        setValue(`issue.${index}.qty`, num);
                        event.target.value =
                          num > 0 ? numberFormatter(num) : "";
                      },
                    })}
                    error={errors.issue?.[index]?.qty?.message}
                  />
                </>
              )}
              <Button
                type="button"
                variant="vanilla"
                className="!p-[0.55rem] mt-1 hover:bg-gray-100"
                onClick={() => {
                  // if (index == 0) return;
                  remove(index);
                }}
                icon={<XMarkIcon width={"18px"} height={"18px"} />}
              />
            </div>
          );
        })}
      </div>
      <Button
        type="button"
        variant="outline"
        className="text-xs py-[0.6rem] space-x-2 w-full shadow-sm"
        onClick={() =>
          append(
            new CreateChallanIssueWithChallan({
              designs: watch("designs"),
              date: getValues("issueDate") ?? today,
            })
          )
        }
        icon={<PlusIcon width={"18px"} height={"18px"} />}
        text="Add Issue Materials"
      />
      {errors.issue?.root?.message && (
        <span className="text-xs text-red">
          * {errors.issue?.root?.message}
        </span>
      )}
    </div>
  );
};
