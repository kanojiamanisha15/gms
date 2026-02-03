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

// Mock data for the last 12 months
const chartData = [
  { month: "Jan", revenue: 12500, expenses: 8500, profit: 4000 },
  { month: "Feb", revenue: 18200, expenses: 11200, profit: 7000 },
  { month: "Mar", revenue: 15200, expenses: 9800, profit: 5400 },
  { month: "Apr", revenue: 21000, expenses: 13500, profit: 7500 },
  { month: "May", revenue: 19800, expenses: 12800, profit: 7000 },
  { month: "Jun", revenue: 22500, expenses: 14200, profit: 8300 },
  { month: "Jul", revenue: 24500, expenses: 15800, profit: 8700 },
  { month: "Aug", revenue: 23200, expenses: 15100, profit: 8100 },
  { month: "Sep", revenue: 21800, expenses: 14100, profit: 7700 },
  { month: "Oct", revenue: 26700, expenses: 17200, profit: 9500 },
  { month: "Nov", revenue: 25100, expenses: 16200, profit: 8900 },
  { month: "Dec", revenue: 28900, expenses: 18600, profit: 10300 },
];

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

export function FinancialChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>
          Revenue, expenses, and profit for the last 12 months
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
