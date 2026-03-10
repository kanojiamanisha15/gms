"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { LoadingState } from "@/components/ui/loading-state";
import { useFinancialChart } from "@/hooks/use-dashboard";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--color-chart-1)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--color-chart-2)",
  },
  profit: {
    label: "Profit",
    color: "var(--color-chart-3)",
  },
} satisfies ChartConfig;

const defaultChartData: { month: string; revenue: number; expenses: number; profit: number }[] = [];

export function FinancialChart() {
  const { data: chartData = defaultChartData, isLoading, isError, error } = useFinancialChart();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>
          Revenue, expenses, and profit for the last 12 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isError ? (
          <p className="text-sm text-destructive mb-4">
            {error instanceof Error ? error.message : "Failed to load chart data"}
          </p>
        ) : isLoading ? (
          <LoadingState
            className="h-[350px] w-full rounded-lg bg-muted/50"
            iconClassName="h-10 w-10"
          />
        ) : (
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `Rs.${value / 1000}k`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value) => `Rs.${Number(value).toLocaleString()}`}
                />
              }
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => {
                const config = chartConfig[value as keyof typeof chartConfig];
                return config?.label || value;
              }}
            />
            <Bar
              dataKey="revenue"
              fill="var(--color-chart-1)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              fill="var(--color-chart-2)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="profit"
              fill="var(--color-chart-3)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
