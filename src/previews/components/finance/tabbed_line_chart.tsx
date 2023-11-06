import React from "react";
import {
  AreaChart,
  Card,
  Metric,
  TabList,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
  Text,
  Title,
} from "@tremor/react";
import { currencyFormatter, numberFormatter } from "../global/utils";

interface DataItem {
  Month: string;
  Purchase: number;
  Jobwork: number;
  Outward: number;
  Sales: number;
}

const generateMockData = (): DataItem[] => {
  const todayDate = new Date().getDate();
  const months = [
    `Jan ${todayDate}`,
    `Feb ${todayDate}`,
    `Mar ${todayDate}`,
    `Apr ${todayDate}`,
    `May ${todayDate}`,
    `Jun ${todayDate}`,
    `Jul ${todayDate}`,
    `Aug ${todayDate}`,
    `Sep ${todayDate}`,
    `Oct ${todayDate}`,
    `Nov ${todayDate}`,
    `Dec ${todayDate}`,
  ];

  const generateRandomCurrency = () => {
    const min = 1;
    const max = 1000; // Adjust this range as needed
    const randomValue = Math.random() * (max - min) + min;
    return randomValue * 50;
  };

  const mockData: DataItem[] = months.map((month) => ({
    Month: month,
    Purchase: generateRandomCurrency(),
    Jobwork: generateRandomCurrency(),
    Outward: generateRandomCurrency(),
    Sales: generateRandomCurrency(),
  }));

  return mockData;
};

const data: DataItem[] = generateMockData();

function sumArray(array: DataItem[], metric: keyof DataItem) {
  console.log(metric, array);
  return array.reduce(
    (accumulator, currentValue) =>
      accumulator + (currentValue[metric] as number),
    0
  );
}

const shortCurrencyFormatter = (num: number) =>
  Intl.NumberFormat("en", { notation: "compact" }).format(num);

export const FinanceLineChart: React.FC = () => {
  return (
    <Card className="p-0">
      <TabGroup>
        <TabList>
          <Tab className="p-4 sm:p-6 text-left">
            <p className="text-sm sm:text-base">Purchase</p>
            <Metric className="mt-2 text-inherit">
              {shortCurrencyFormatter(sumArray(data, "Purchase"))}
            </Metric>
          </Tab>
          <Tab className="p-4 sm:p-6 text-left">
            <p className="text-sm sm:text-base">Jobwork</p>
            <Metric className="mt-2 text-inherit">
              {shortCurrencyFormatter(sumArray(data, "Jobwork"))}
            </Metric>
          </Tab>
          <Tab className="p-4 sm:p-6 text-left">
            <p className="text-sm sm:text-base">Outward</p>
            <Metric className="mt-2 text-inherit">
              {shortCurrencyFormatter(sumArray(data, "Outward"))}
            </Metric>
          </Tab>
          <Tab className="p-4 sm:p-6 text-left">
            <p className="text-sm sm:text-base">Sales</p>
            <Metric className="mt-2 text-inherit">
              {shortCurrencyFormatter(sumArray(data, "Sales"))}
            </Metric>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="p-6">
            <AreaChart
              className="h-80 mt-10"
              data={data}
              index="Month"
              categories={["Purchase"]}
              colors={["blue"]}
              valueFormatter={numberFormatter}
              showLegend={false}
              yAxisWidth={50}
            />
          </TabPanel>
          <TabPanel className="p-6">
            <AreaChart
              className="h-80 mt-10"
              data={data}
              index="Month"
              categories={["Jobwork"]}
              colors={["blue"]}
              valueFormatter={numberFormatter}
              showLegend={false}
              yAxisWidth={50}
            />
          </TabPanel>
          <TabPanel className="p-6">
            <AreaChart
              className="h-80 mt-10"
              data={data}
              index="Month"
              categories={["Outward"]}
              colors={["blue"]}
              valueFormatter={numberFormatter}
              showLegend={false}
              yAxisWidth={50}
            />
          </TabPanel>
          <TabPanel className="p-6">
            <AreaChart
              className="h-80 mt-10"
              data={data}
              index="Month"
              categories={["Sales"]}
              colors={["blue"]}
              valueFormatter={numberFormatter}
              showLegend={false}
              yAxisWidth={50}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};
