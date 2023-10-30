import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import {
  CreateChallanExpectWithChallan,
  CreateChallanModel,
  StockModel,
} from "../../models";
import { DesignStatus } from "../../models/types";
import { DesignSelector } from "../design/design_selector";
import { Button, InputField } from "../global";
import {
  PlusIcon,
  XMarkIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import { StockSelectField } from "../stock/stock_select_field";
import {
  currencyFormatter,
  numberFormatter,
  parseFormattedNumber,
} from "../global/utils";

export const CreateChallanExpectationForm = () => {
  const {
    control,
    register,
    setValue,
    getValues,
    watch,
    setFocus,
    formState: { errors },
  } = useFormContext<CreateChallanModel>();

  const { fields, append, remove } = useFieldArray<CreateChallanModel>({
    name: "expectations",
    rules: {
      required: "Please add expectations",
      validate: (expectations) => {
        const isSeen: number[] = [];
        for (const expect of expectations as CreateChallanExpectWithChallan[]) {
          if (expect.stock && isSeen.includes(expect.stock.id)) {
            return "Duplicate Items Found";
          } else if (expect.stock) {
            isSeen.push(expect.stock.id);
          }
        }
        return undefined;
      },
    },
  });

  const copyFromIssue = () => {
    const issues = getValues("issue");
    let expectations: CreateChallanExpectWithChallan[] = [];
    for (const issue of issues) {
      if (!issue.stock) continue;

      const expect = expectations.find((e) => e.stock!.id === issue!.stock!.id);
      if (expect) {
        expect.qty = (expect.qty ?? 0) + (issue.qty ?? 0);
      } else {
        expectations.push(
          new CreateChallanExpectWithChallan({
            designs: issue.stock.design ? [issue.stock.design] : [],
            stock: issue.stock,
            qty: issue.qty,
          })
        );
      }
    }

    setValue("expectations", expectations);
    setFocus("expectations.0.rate");
  };

  const updateTotal = () => {
    // const expectations = getValues('expectations');
    // let total = getValues('total');
    // total =
    //   expectations?.reduce((total, expectation) => {
    //     const { qty, rate } = expectation;
    //     if (!qty || !rate) return total;
    //     const lineitemTotal = qty * rate;
    //     return total + lineitemTotal;
    //   }, 0) ?? 0;
    // setValue('total', total);
  };

  const category = getValues("category");

  return (
    <div className={`space-y-3 w-full min-w-min`}>
      {category.key !== "PURCHASE" && category.key !== "INWARD" && (
        <Button
          type="button"
          variant="vanilla"
          className="text-xs space-x-2 w-full"
          onClick={copyFromIssue}
          icon={<ClipboardIcon width={"18px"} height={"18px"} />}
          text="Copy From Issue"
        />
      )}
      <div className="flex flex-col items-end justify-start space-y-2 flex-wrap">
        {fields.map((field, index) => {
          const unit = watch(`expectations.${index}.stock`)?.unit;
          const designs = watch(`expectations.${index}.designs`);
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
                          setValue(`expectations.${index}.designs`, []);
                          return;
                        }

                        if (!field.value || field.value.length < 1) {
                          setValue(`expectations.${index}.designs`, [design]);
                        } else if (
                          field.value.findIndex((e) => e.id == design.id) !== -1
                        ) {
                          setValue(
                            `expectations.${index}.designs`,
                            field.value.filter((c) => c.id !== design.id)
                          );
                        } else {
                          setValue(`expectations.${index}.designs`, [
                            ...field.value,
                            design,
                          ]);
                        }
                      }}
                      onClear={() =>
                        setValue(`expectations.${index}.designs`, [])
                      }
                    />
                  );
                }}
                control={control}
                name={`expectations.${index}.designs`}
              />
              <Controller
                render={({ field, fieldState }) => {
                  return (
                    <StockSelectField
                      label={"Stock"}
                      query={{
                        aggregatedData: false,
                        designs,
                      }}
                      design={designs.length === 1 ? designs[0] : undefined}
                      selected={field.value}
                      onSelect={(stock?: StockModel) => {
                        setValue(`expectations.${index}.stock`, stock);
                      }}
                      focusOnMount={!field.value}
                      className={"flex-grow"}
                      error={fieldState.error?.message}
                    />
                  );
                }}
                control={control}
                name={`expectations.${index}.stock`}
                rules={{
                  required: "Select Stock",
                }}
              />
              {unit && (
                <>
                  <InputField
                    label="Qty"
                    placeholder="0.0"
                    suffix={
                      unit ? (
                        <div className="px-3 py-3 rounded-r-md h-full text-xs bg-primary-100 text-primary-400">
                          {unit}
                        </div>
                      ) : undefined
                    }
                    inputProps={register(`expectations.${index}.qty`, {
                      required: "Required",
                      valueAsNumber: true,
                      validate: (value) => {
                        if (value === 0) return "Cannot be 0";
                      },
                      onBlur: (event) => {
                        const num = parseFormattedNumber(event.target.value);
                        setValue(`expectations.${index}.qty`, num);
                        event.target.value =
                          num > 0 ? numberFormatter(num) : "";
                        updateTotal();
                      },
                    })}
                    error={errors.expectations?.[index]?.qty?.message}
                  />
                  <InputField
                    label="Rate (Optional)"
                    placeholder={currencyFormatter("0")}
                    inputProps={register(`expectations.${index}.rate`, {
                      valueAsNumber: true,
                      onBlur: (event) => {
                        const num = parseFormattedNumber(event.target.value);
                        setValue(`expectations.${index}.rate`, num);
                        event.target.value =
                          num > 0 ? currencyFormatter(num) : "";
                        updateTotal();
                      },
                    })}
                    error={errors.expectations?.[index]?.rate?.message}
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
            new CreateChallanExpectWithChallan({ designs: watch("designs") })
          )
        }
        icon={<PlusIcon width={"18px"} height={"18px"} />}
        text="Add Items To Receive"
      />
      {errors.expectations?.root?.message && (
        <span className="text-xs text-red">
          {errors.expectations?.root?.message}
        </span>
      )}
    </div>
  );
};
