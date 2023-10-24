"use client";

import moment from "moment";
import { DialogFormProvider } from "../../hooks/use_dialog_form";
import { ChallanListModel, CreateChallanInspectModel } from "../../models";
import React, { useEffect } from "react";
import {
  BaseDialogForm,
  DateField,
  InputField,
  Tag,
  TriggerButton,
} from "../global";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { ChallanSelectField } from "./challan_select_field";
import { JobStatus } from "../../models/types";
import {
  numberFormatter,
  getServerDate,
  parseFormattedNumber,
} from "../global/utils";
import { CreateInspectItem } from "../../models/challan/challan_inspect_model";

export const ProcessReceiveForm = ({ challan }: Props) => {
  const isFinal: boolean | undefined = challan
    ? challan.category.key === "OUTWARD" || challan.category.key === "SALES"
    : undefined;

  return (
    <DialogFormProvider<CreateChallanInspectModel> defaultValues={{ challan }}>
      <BaseDialogForm<CreateChallanInspectModel>
        title={isFinal ? "Mark Delivered" : "Receive Stock"}
        description={`Fill the fields and submit to ${
          isFinal
            ? "mark stock as delivered"
            : "recieve and add stock in inventory"
        }`}
        className="max-w-lg"
        trigger={
          <TriggerButton
            variant="outline"
            text={isFinal ? "Mark as Delivered" : "Receive Stock"}
            className="border-0 hover:bg-gray-100 text-xs text-primary-400 !p-2"
            icon={<PlusIcon width={14} height={14} />}
          />
        }
      >
        <ProcessReceiveithFormContext challan={challan} />
      </BaseDialogForm>
    </DialogFormProvider>
  );
};

type Props = {
  className?: string;
  challan?: ChallanListModel;
  expectItems?: CreateInspectItem[];
};

export const ProcessReceiveithFormContext = ({
  challan: defaultChallan,
  expectItems: defaultExpectItems,
}: Props) => {
  const {
    control,
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useFormContext<CreateChallanInspectModel>();

  const { fields } = useFieldArray<CreateChallanInspectModel>({
    control,
    name: "expectItems",
    rules: {
      required: true,
      minLength: {
        value: 1,
        message: "Add at least 1 stock to receive",
      },
      validate: (inspections) => {
        if (inspections.length === 0) return undefined;

        const isSeen: number[] = [];
        for (const inspect of inspections as CreateInspectItem[]) {
          if (!inspect.expect) continue;
          if (inspect.expect.id && isSeen.includes(inspect.expect.id)) {
            return "Duplicate Entry Found";
          } else if (inspect.expect) {
            isSeen.push(inspect.expect.id);
          }
        }

        const data = (inspections as CreateInspectItem[]).filter(
          (e) =>
            (e.ok && e.ok > 0) || (e.rf && e.rf > 0) || (e.short && e.short > 0)
        );

        if (data.length < 1) return "Please Enter Qty";

        return undefined;
      },
    },
  });

  const getSumOfInputItems = (index: number): number => {
    const expect = getValues(`expectItems.${index}.expect`);

    if (expect) {
      const ok = getValues(`expectItems.${index}.ok`);
      const rf = getValues(`expectItems.${index}.rf`);
      const short = getValues(`expectItems.${index}.short`);

      const sumOfInputItems =
        parseFormattedNumber(ok?.toString()) +
        parseFormattedNumber(rf?.toString()) +
        parseFormattedNumber(short?.toString());
      return sumOfInputItems;
    }
    return 0;
  };

  return (
    <div className="space-y-4">
      {!defaultChallan && (
        <Controller
          render={({ field, fieldState }) => {
            return (
              <ChallanSelectField
                label={"Select Challan"}
                className="flex-grow"
                focusOnMount={true}
                disabled={defaultChallan !== undefined}
                query={{
                  jobStatus: new JobStatus("PENDING"),
                }}
                selected={field.value}
                onSelect={(challan) => {
                  if (challan) {
                    setValue("challan", challan);
                  }
                }}
                error={fieldState.error?.message}
              />
            );
          }}
          control={control}
          name="challan"
          defaultValue={defaultChallan}
          rules={{ required: true }}
        />
      )}
      {fields.map((field, index) => {
        const expect = getValues(`expectItems.${index}.expect`);
        return (
          <div className="space-y-4" key={field.id}>
            <div className="flex-between gap-x-4">
              {expect && (
                <div className="flex-start gap-x-3">
                  {expect.stock.design && (
                    <Tag
                      key={`design_${expect.stock.design.id}`}
                      text={expect.stock.design.code}
                      style={{
                        color: expect.stock.design.status.color,
                        backgroundColor:
                          expect.stock.design.status.backgroundColor,
                      }}
                    />
                  )}
                  <span className="text-sm font-semibold text-gray-600">
                    {expect.stock.name}
                  </span>
                </div>
              )}
              {expect && (
                <Tag
                  text={`PENDING ${numberFormatter(
                    expect.qty - expect.inspectedQty
                  )} / ${expect.qty}`}
                  className="bg-green-washed mb-2 text-green"
                />
              )}
            </div>

            {expect && (
              <>
                {/* <div className="text-xs text-gray-500 flex items-center gap-x-4">
                  <Tag
                    text={`PENDING ${numberFormatter(
                      getTotalInspectItems(index)
                    )} / ${expect.qty}`}
                    className="bg-green-washed text-green"
                  />
                  <ProgressBar
                    progress={
                      ((getTotalInspectItems(index) +
                        getSumOfInputItems(index)) *
                        100) /
                      (getValues(`expectItems.${index}.expect`)?.qty ?? 1)
                    }
                    className="!bg-green-washed"
                  />
                </div> */}

                <Controller
                  render={({ field, fieldState }) => {
                    return (
                      <div className="flex gap-x-4">
                        <Controller
                          render={({ field, fieldState }) => {
                            return (
                              <DateField
                                label="Payment Date"
                                selectedDate={field.value}
                                error={fieldState.error?.message}
                                onApply={(date) => {
                                  if (date)
                                    setValue(`expectItems.${index}.date`, date);
                                }}
                              />
                            );
                          }}
                          control={control}
                          name={`expectItems.${index}.date`}
                          rules={{
                            required: "Enter Payment Date",
                            pattern: {
                              value:
                                /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
                              message: "Invalid Date",
                            },
                          }}
                        />
                        <InputField
                          label="OK"
                          focusOnMount={index < 1}
                          inputProps={register(`expectItems.${index}.ok`, {
                            onBlur: (event) => {
                              const num = parseFormattedNumber(
                                event.target.value
                              );
                              setValue(`expectItems.${index}.ok`, num);
                              event.target.value =
                                num > 0 ? numberFormatter(num) : "";
                            },
                          })}
                          error={errors.expectItems?.[index]?.ok?.message}
                        />
                        <InputField
                          label="RF"
                          inputProps={register(`expectItems.${index}.rf`, {
                            onBlur: (event) => {
                              const num = parseFormattedNumber(
                                event.target.value
                              );
                              setValue(`expectItems.${index}.rf`, num);
                              event.target.value =
                                num > 0 ? numberFormatter(num) : "";
                            },
                          })}
                          error={errors.expectItems?.[index]?.rf?.message}
                        />
                        <InputField
                          label="SHORT"
                          inputProps={register(`expectItems.${index}.short`, {
                            onBlur: (event) => {
                              const num = parseFormattedNumber(
                                event.target.value
                              );
                              setValue(`expectItems.${index}.short`, num);
                              event.target.value =
                                num > 0 ? numberFormatter(num) : "";
                            },
                          })}
                          error={errors.expectItems?.[index]?.short?.message}
                        />
                      </div>
                    );
                  }}
                  control={control}
                  name={`expectItems.${index}`}
                  rules={{
                    validate: (value) => {
                      if (!value.expect) return "Select Stock";
                      const max = value.expect.qty - value.expect.inspectedQty;
                      const sumOfInputItems = getSumOfInputItems(index);

                      if (sumOfInputItems > max) {
                        return "Number of Items you entered exceeds number of pending items";
                      } else return true;
                    },
                  }}
                />
              </>
            )}
            {errors.expectItems && `errors.expectItems.${index}` && (
              <span className="text-xs text-red">
                {errors.expectItems?.[index]?.message}
              </span>
            )}
          </div>
        );
      })}
      {errors?.expectItems?.root?.message && (
        <span className="text-xs text-red">
          * {errors.expectItems.root.message}
        </span>
      )}
    </div>
  );
};
