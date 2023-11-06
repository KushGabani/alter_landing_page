"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "./components/global";
import { CreateChallanModel } from "./models";
import { CreateChallanBasicForm } from "./components/challan/create_challan_basic_form";
import { CreateChallanIssueForm } from "./components/challan/create_challan_issue_form";
import { CreateChallanExpectationForm } from "./components/challan/create_challan_expectation_form";
import { CreateChallanLineItemForm } from "./components/challan/create_challan_lineitem_form";
import { ClientCategory, StockCategory } from "./models/types";

type Props = {
  category: StockCategory;
  clientCategory: ClientCategory[];
};

const CreateChallan: React.FC<Props> = ({ category, clientCategory }) => {
  const formMethods = useForm<CreateChallanModel>({
    defaultValues: {
      isSubChallan: false,
      category: category,
      designs: [],
      fromChallans: [],
      fromProcess:
        category.key === "OUTWARD" || category.key === "SALES"
          ? new StockCategory("JOBWORK")
          : undefined,
      lot: "A",
      issue: [],
      expectations: [],
      lineitems: [],
      mainChallanIds: [],
      parentChallanIds: [],
      autoIssue: true,
    },
  });

  const { handleSubmit, trigger } = formMethods;

  const onSubmit = (data: CreateChallanModel) => {};

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Create {category.text} Challan
      </h1>
      <FormProvider {...formMethods}>
        <form
          className="space-y-8 w-full 2xl:w-8/12"
          onKeyDown={(event) => {
            if (event.ctrlKey && event.key === "Enter") {
              return handleSubmit(onSubmit)(event);
            }
          }}
          autoComplete="off"
        >
          <div className="space-y-2">
            <SectionHeading>Basic Details</SectionHeading>
            <CreateChallanBasicForm clientCategory={clientCategory} />
          </div>
          {category.key !== "PURCHASE" && category.key !== "INWARD" && (
            <div className="space-y-2">
              <SectionHeading>Issue Materials</SectionHeading>
              <CreateChallanIssueForm />
            </div>
          )}
          {category.key !== "OUTWARD" && category.key !== "SALES" && (
            <div className="space-y-2">
              <SectionHeading>Items To Receive</SectionHeading>
              <CreateChallanExpectationForm />
            </div>
          )}
          <div className="space-y-2">
            <SectionHeading>
              {category.key !== "OUTWARD" && category.key !== "SALES"
                ? "Additional Payables (optional)"
                : "Payables"}
            </SectionHeading>
            <CreateChallanLineItemForm />
          </div>
          <div className="flex-start space-x-6">
            <Button
              type="button"
              variant="solid"
              text="Create Challan"
              onClick={(event) => {
                event.stopPropagation();
                trigger().then((value) => {
                  if (value) {
                    return handleSubmit(onSubmit)(event);
                  }
                });
              }}
            />
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2 className="flex-start gap-x-4 text-lg text-gray-800 tracking-tight font-medium">
        {children}
      </h2>
      <hr />
    </>
  );
};

export default CreateChallan;
