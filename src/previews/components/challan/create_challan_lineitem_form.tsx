import {
  CreateChallanLineItemWithChallan,
  CreateChallanModel,
  StockModel,
} from "../../models";
import {
  XMarkIcon,
  PlusIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import {
  parseFormattedNumber,
  numberFormatter,
  currencyFormatter,
} from "../global/utils";
import { Button, InputField } from "../global";
import { StockSelectField } from "../stock/stock_select_field";

export const CreateChallanLineItemForm = () => {
  const {
    control,
    register,
    setValue,
    setFocus,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<CreateChallanModel>();

  const { fields, append, remove } = useFieldArray<CreateChallanModel>({
    name: "lineitems",
    rules: {
      validate: (lineitems) => {
        if (lineitems.length === 0) return undefined;

        const isSeen: number[] = [];
        for (const lineitem of lineitems as CreateChallanLineItemWithChallan[]) {
          if (lineitem.stock && isSeen.includes(lineitem.stock.id)) {
            return "Duplicate Payables Found";
          } else if (lineitem.stock) {
            isSeen.push(lineitem.stock.id);
          }
        }
        return undefined;
      },
    },
  });

  const getTotal = (index: number) => {
    const rate = parseFormattedNumber(
      getValues(`lineitems.${index}.rate`)?.toString()
    );
    const qty = parseFormattedNumber(
      getValues(`lineitems.${index}.qty`)?.toString()
    );
    return isNaN(rate * qty) ? 0 : rate * qty;
  };

  const updateTotal = () => {
    // const lineitems = getValues('lineitems');
    // let total = getValues('total');
    // total =
    //   lineitems?.reduce((total, lineitem) => {
    //     const { qty, rate } = lineitem;
    //     if (!qty || !rate) return total;
    //     const lineitemTotal = qty * rate;
    //     return total + lineitemTotal;
    //   }, 0) ?? 0;
    // setValue('total', total);
  };

  const copyFromIssue = () => {
    const issues = getValues("issue");
    let lineitems: CreateChallanLineItemWithChallan[] = [];
    for (const issue of issues) {
      if (!issue.stock) continue;

      const lineitem = lineitems.find((e) => e.stock!.id === issue!.stock!.id);
      if (lineitem) {
        lineitem.qty = (lineitem.qty ?? 0) + (issue.qty ?? 0);
      } else {
        lineitems.push(
          new CreateChallanLineItemWithChallan({
            stock: issue.stock,
            qty: issue.qty,
          })
        );
      }
    }

    setValue("lineitems", lineitems);
    setFocus("lineitems.0.rate");
  };
  const category = getValues("category");

  return (
    <div className={`space-y-3 w-full min-w-min`}>
      {category.key === "SALES" && (
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
          const unit = watch(`lineitems.${index}.stock`)?.unit;
          return (
            <>
              <div
                key={field.id}
                className="flex w-full sm:items-end sm:justify-start flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-3"
              >
                <Controller
                  render={({ field, fieldState }) => {
                    const designs = getValues("designs");
                    return (
                      <StockSelectField
                        label={"Stock"}
                        query={{
                          aggregatedData: false,
                          designs: designs,
                        }}
                        selected={field.value}
                        design={designs.length === 1 ? designs[0] : undefined}
                        onSelect={(stock?: StockModel) => {
                          setValue(`lineitems.${index}.stock`, stock);
                        }}
                        focusOnMount={!field.value}
                        className={"flex-grow"}
                        error={fieldState.error?.message}
                      />
                    );
                  }}
                  control={control}
                  name={`lineitems.${index}.stock`}
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
                      inputProps={register(`lineitems.${index}.qty`, {
                        required: "Required",
                        valueAsNumber: true,
                        validate: (value) => {
                          if (value === 0) return "Cannot be 0";
                        },
                        onBlur: (event) => {
                          const num = parseFormattedNumber(event.target.value);
                          setValue(`lineitems.${index}.qty`, num);
                          event.target.value =
                            num > 0 ? numberFormatter(num) : "";
                          updateTotal();
                        },
                      })}
                      error={errors.lineitems?.[index]?.qty?.message}
                    />
                    <InputField
                      label="Rate"
                      placeholder={currencyFormatter("0")}
                      inputProps={register(`lineitems.${index}.rate`, {
                        required: "Required",
                        valueAsNumber: true,
                        onBlur: (event) => {
                          const num = parseFormattedNumber(event.target.value);
                          setValue(`lineitems.${index}.rate`, num);
                          event.target.value =
                            num > 0 ? currencyFormatter(num) : "";
                          updateTotal();
                        },
                      })}
                      error={errors.lineitems?.[index]?.rate?.message}
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
              <p className="mr-14 text-xs text-gray-400 ">
                {currencyFormatter(getTotal(index))}
              </p>
            </>
          );
        })}
      </div>
      <Button
        type="button"
        variant="outline"
        className="text-xs py-[0.6rem] space-x-2 w-full shadow-sm"
        onClick={() => append(new CreateChallanLineItemWithChallan({}))}
        icon={<PlusIcon width={"18px"} height={"18px"} />}
        text="Add Additional Payables"
      />
      {errors.lineitems?.root?.message && (
        <span className="text-xs text-red">
          * {errors.lineitems?.root?.message}
        </span>
      )}
    </div>
  );
};
