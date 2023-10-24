import { PlusIcon } from "@radix-ui/react-icons";
import { TriggerButton } from "./components/global";
import { ViewStockTable } from "./components/stock/view_stock_table";

import { StockCategory } from "./models/types";
import { ChallanIssueTable } from "./components/challan/challan_issue_table";
import { ChallanExpectationTable } from "./components/challan/challan_expectation_table";

export const StockPage = () => {
  const category = new StockCategory("JOBWORK");
  return (
    <div className="h-screen p-8 space-y-6">
      <div className="flex-between">
        <h1 className="sm:text-3xl text-xl font-semibold tracking-tight">
          Jobwork Stocks
        </h1>
        <TriggerButton
          text="Create Stock"
          variant="solid"
          icon={<PlusIcon width={"18px"} height={"18px"} color="white" />}
        />
      </div>
      <ChallanExpectationTable category={category} />
      <ViewStockTable category={category} />
    </div>
  );
};
