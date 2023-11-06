import { FinanceCard } from "./components/finance/finance_card";
import { FinanceLineChart } from "./components/finance/tabbed_line_chart";
import { expenseCard, incomeCard } from "./data/finance_data";
import { Grid } from "@tremor/react";

const FinancePage = () => {
  return (
    <>
      <Grid numItemsMd={2} className="gap-6 pt-3">
        <FinanceCard
          title="Income"
          tabs={["Sales", "Outward"]}
          metric={442276}
          prevMetric={382482}
          clientInfo={incomeCard}
        />
        <FinanceCard
          title="Expense"
          tabs={["Purchase", "Jobwork"]}
          metric={232000}
          prevMetric={248345}
          clientInfo={expenseCard}
        />
      </Grid>
      <div className="px-3 mt-6 pb-3">
        <FinanceLineChart />
      </div>
    </>
  );
};

export default FinancePage;
