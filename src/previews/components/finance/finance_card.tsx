import { useState } from "react";
import {
  Card,
  TabList,
  Tab,
  ProgressBar,
  Text,
  Flex,
  Metric,
  BadgeDelta,
  TabGroup,
} from "@tremor/react";
import { currencyFormatter, numberFormatter } from "../global/utils";

type Props = {
  title: string;
  tabs: string[];
  metric: number;
  prevMetric: number;
  clientInfo: {
    title: string;
    value: number;
    metric: number;
    location: string;
  }[];
};

export const FinanceCard = ({
  title,
  metric,
  prevMetric,
  clientInfo: products,
  tabs,
}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedLocation = selectedIndex === 0 ? "A" : "B";

  const delta = ((metric - prevMetric) / metric) * 100;

  return (
    <Card className="max-w-md mx-auto">
      <Flex alignItems="start">
        <Text>{title}</Text>
        <BadgeDelta deltaType="moderateIncrease">
          {numberFormatter(delta)} %
        </BadgeDelta>
      </Flex>
      <Flex
        justifyContent="start"
        alignItems="baseline"
        className="space-x-3 truncate"
      >
        <Metric>{currencyFormatter(metric)}</Metric>
        <Text>from {currencyFormatter(prevMetric)}</Text>
      </Flex>
      <TabGroup
        index={selectedIndex}
        onIndexChange={setSelectedIndex}
        className="mt-6"
      >
        <TabList>
          {tabs.map((item) => (
            <Tab key={`tab_${item.toLowerCase()}`}>{item}</Tab>
          ))}
        </TabList>
      </TabGroup>
      {products
        .filter((item) => item.location === selectedLocation)
        .map((item) => (
          <div key={item.title} className="space-y-2 mt-4">
            <Flex>
              <Text>{item.title}</Text>
              <Text>{`${item.value}% (${currencyFormatter(
                item.metric
              )})`}</Text>
            </Flex>
            <ProgressBar value={item.value} />
          </div>
        ))}
    </Card>
  );
};
