"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import { Loader2 } from "lucide-react";
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
import { usePaymentsOverview } from "@/hooks/use-payments";

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

const defaultChartData: { month: string; received: number; due: number }[] = [];

export function PaymentsChart() {
  const { data: chartData = defaultChartData, isLoading, isError, error } = usePaymentsOverview();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Payments Overview</CardTitle>
        <CardDescription>
          Payments received vs payments due for the last 12 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isError ? (
          <p className="text-sm text-destructive mb-4">
            {error instanceof Error ? error.message : "Failed to load chart data"}
          </p>
        ):
        isLoading ? (
          <div className="h-[350px] w-full flex items-center justify-center bg-muted/50 rounded-lg">
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
          </div>
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
              <Bar dataKey="received" fill="#adb5bd" radius={[4, 4, 0, 0]} />
              <Bar dataKey="due" fill="#6c757d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
