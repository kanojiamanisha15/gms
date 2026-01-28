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
  { month: "Jan", received: 12500, due: 15000 },
  { month: "Feb", received: 18200, due: 19500 },
  { month: "Mar", received: 15200, due: 18000 },
  { month: "Apr", received: 21000, due: 22000 },
  { month: "May", received: 19800, due: 21000 },
  { month: "Jun", received: 22500, due: 24000 },
  { month: "Jul", received: 24500, due: 26000 },
  { month: "Aug", received: 23200, due: 25000 },
  { month: "Sep", received: 21800, due: 23500 },
  { month: "Oct", received: 26700, due: 28000 },
  { month: "Nov", received: 25100, due: 27000 },
  { month: "Dec", received: 28900, due: 30000 },
];

const chartConfig = {
  received: {
    label: "Payments Received",
    color: "var(--color-primary)",
  },
  due: {
    label: "Payments Due",
    color: "var(--color-muted)",
  },
} satisfies ChartConfig;

export function PaymentsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Payments Overview</CardTitle>
        <CardDescription>
          Payments received vs payments due for the last 12 months
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
              content={<ChartTooltipContent indicator="line" />}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => {
                const config = chartConfig[value as keyof typeof chartConfig];
                return config?.label || value;
              }}
            />
            <Bar dataKey="received" fill="#adb5bd" radius={[4, 4, 0, 0]} />
            <Bar dataKey="due" fill="#6c757d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
