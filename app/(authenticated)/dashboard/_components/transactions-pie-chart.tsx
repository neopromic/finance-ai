"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { Card, CardContent } from "@/app/_components/ui/card";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import type { TransactionPercentagesPerType } from "@/app/_data/get-dashboard/types";
import PercentageItem from "./percentage-item";

interface TransactionsPieChartProps {
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  typesPercentages: TransactionPercentagesPerType;
}

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesa",
    color: "#E93030",
  },
} satisfies ChartConfig;

const TransactionsPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentages,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFF",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
  ];

  return (
    <Card className="flex flex-col py-12">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            ></Pie>
          </PieChart>
        </ChartContainer>
        <div className="space-y-2">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            value={typesPercentages[TransactionType.DEPOSIT]}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-danger" />}
            title="Gastos"
            value={typesPercentages[TransactionType.EXPENSE]}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} className="text-white" />}
            title="Investido"
            value={typesPercentages[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsPieChart;
