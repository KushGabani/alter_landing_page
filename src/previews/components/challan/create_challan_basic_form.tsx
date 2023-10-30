import moment from "moment";
import { Controller, useFormContext } from "react-hook-form";

import { ClientSelectField } from "../client/client_select_field.tsx";
import { DesignSelectField } from "../design/design_select_field.tsx";
import { DateField, InputField } from "../global";
import { StocktypeSelectField } from "../stock/stocktype_select_field.tsx";
import { CreateChallanModel } from "../../models/";
import { ClientCategory, DesignStatus } from "../../models/types";
import { parseFormattedNumber } from "../global/utils";
import { ChallanSeriesField } from "./challan_series_field";

type Props = {
  clientCategory: ClientCategory[];
};

export const CreateChallanBasicForm = ({ clientCategory }: Props) => {
  const {
    control,
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<CreateChallanModel>();

  const category = getValues("category").key;
  return (
    <div className="flex flex-col justify-start w-full gap-y-4">
      <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row sm:space-x-8 sm:space-y-0 space-y-3">
        {getValues("category").key === "JOBWORK" && (
          <Controller
            render={({ field, fieldState }) => (
              <StocktypeSelectField
                label="Jobtype"
                selected={field.value}
                className="flex-grow"
                onSelect={(type) => setValue("type", type)}
                error={fieldState.error?.message}
              />
            )}
            control={control}
            name="type"
            rules={{
              required: "Select Jobtype",
            }}
          />
        )}
        <Controller
          render={({ field, fieldState }) => (
            <ChallanSeriesField
              selected={field.value}
              className="flex-grow"
              category={getValues("category")}
              type={watch("type")}
              onSelect={(series, checked) => {
                if (!checked) setValue("series", undefined);
                else {
                  setValue("series", series);
                  setValue("challanNo", series.number.toString());
                }
              }}
              inputProps={register("challanNo", {
                required: "Required",
                pattern: {
                  value: /^[a-zA-Z0-9-/.]+$/,
                  message: "Invalid Challan No",
                },
                onBlur: (event) => {
                  if (event.target.value) {
                    if (field.value) {
                      const challanNo = parseFormattedNumber(
                        event.target.value
                      );
                      setValue("challanNo", challanNo.toString());
                    } else {
                      event.target.value = event.target.value.toUpperCase();
                      setValue("challanNo", event.target.value);
                    }
                  }
                },
              })}
              error={fieldState.error?.message ?? errors.challanNo?.message}
            />
          )}
          control={control}
          name="series"
          rules={{
            validate: (series) => {
              if (series && !/^\d+$/.test(getValues("challanNo"))) {
                return "Invalid Challan No.";
              }
              return undefined;
            },
          }}
        />
        <Controller
          render={({ field, fieldState }) => (
            <DateField
              label={
                category === "PURCHASE"
                  ? "Order Date"
                  : category === "SALES" || category === "OUTWARD"
                  ? "Delivery Date"
                  : "Issue Date"
              }
              selectedDate={field.value}
              error={fieldState.error?.message}
              onApply={(issueDate) => {
                if (!issueDate) return;
                setValue("issueDate", issueDate);
                const dueDays = getValues("dueDays");
                if (dueDays)
                  setValue(
                    "dueDate",
                    moment(issueDate).add(dueDays, "days").toDate()
                  );
              }}
            />
          )}
          control={control}
          name="issueDate"
          rules={{
            required: "Enter Order Date",
            pattern: {
              value:
                /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
              message: "Invalid Date",
            },
          }}
        />

        <InputField
          label="Due Days"
          className={"w-16 flex-grow"}
          placeholder="0"
          inputProps={register("dueDays", {
            required: "Required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Invalid Due Days",
            },
            onBlur: (event) => {
              if (event.target.value) {
                const dueDays = parseFormattedNumber(event.target.value);
                setValue("dueDays", dueDays);
                const issueDate = getValues("issueDate");
                if (issueDate) {
                  setValue(
                    "dueDate",
                    moment(issueDate).add(dueDays, "days").toDate()
                  );
                }
                event.target.value = dueDays;
              }
            },
          })}
          error={errors.dueDays?.message}
        />

        <Controller
          render={({ field, fieldState }) => {
            return (
              <DateField
                label="Due Date"
                selectedDate={field.value}
                error={fieldState.error?.message}
                onApply={(dueDate) => {
                  if (!dueDate) return;
                  setValue("dueDate", dueDate);
                  const issueDate = getValues("issueDate");
                  if (issueDate)
                    setValue(
                      "dueDays",
                      moment(dueDate).diff(moment(issueDate), "days")
                    );
                }}
              />
            );
          }}
          control={control}
          name="dueDate"
          rules={{
            required: "Enter Due Date",
            pattern: {
              value:
                /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
              message: "Invalid Date",
            },
          }}
        />
      </div>

      <div className="sm:flex sm:items-center flex-col sm:flex-row sm:space-x-8 sm:space-y-0 space-y-3">
        <Controller
          render={({ field, fieldState }) => (
            <ClientSelectField
              label={"Party"}
              className="w-1/2"
              category={clientCategory[0]}
              query={{
                category: clientCategory,
              }}
              selected={field.value}
              onSelect={(client) => {
                if (!client) return;
                setValue("client", client);
                setValue("fromChallans", []);
              }}
              error={fieldState.error?.message}
            />
          )}
          control={control}
          name="client"
          rules={{
            required: "Select Party",
          }}
        />
        {getValues("category").key == "INWARD" && (
          <InputField
            label="Party Challan No."
            className="w-28"
            inputProps={register("clientChallanId", {
              pattern: {
                value: /^[a-zA-Z0-9-/]+$/,
                message: "Invalid Challan No",
              },
              onBlur: (event) => {
                if (event.target.value) {
                  event.target.value = event.target.value.toUpperCase();
                  setValue("clientChallanId", event.target.value);
                }
              },
            })}
            error={errors.challanNo?.message}
          />
        )}
        <Controller
          render={({ field, fieldState }) => {
            return (
              <DesignSelectField<true>
                label={"Design"}
                className="flex-grow"
                query={{ status: new DesignStatus("COMPLETE") }}
                selected={field.value}
                onSelect={(design) => {
                  if (!design) return;

                  if (field.value.findIndex((e) => e.id == design.id) !== -1) {
                    setValue(
                      "designs",
                      field.value.filter((e) => e.id !== design.id)
                    );
                  } else {
                    setValue("designs", [...field.value, design]);
                  }
                }}
                error={fieldState.error?.message}
              />
            );
          }}
          control={control}
          name="designs"
        />
      </div>
    </div>
  );
};
