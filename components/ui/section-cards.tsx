"use client";

import { useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TimePeriod = "monthly" | "quarterly" | "half-yearly" | "yearly";

interface CardData {
  revenue: number;
  newCustomers: number;
  activeAccounts: number;
  growthRate: number;
  revenueChange: number;
  customersChange: number;
  accountsChange: number;
  growthChange: number;
}

const mockData: Record<TimePeriod, CardData> = {
  monthly: {
    revenue: 1250.0,
    newCustomers: 1234,
    activeAccounts: 45678,
    growthRate: 4.5,
    revenueChange: 12.5,
    customersChange: -20,
    accountsChange: 12.5,
    growthChange: 4.5,
  },
  quarterly: {
    revenue: 3750.0,
    newCustomers: 3702,
    activeAccounts: 137034,
    growthRate: 13.5,
    revenueChange: 15.2,
    customersChange: -18.5,
    accountsChange: 14.8,
    growthChange: 5.2,
  },
  "half-yearly": {
    revenue: 7500.0,
    newCustomers: 7404,
    activeAccounts: 274068,
    growthRate: 27.0,
    revenueChange: 18.5,
    customersChange: -15.0,
    accountsChange: 16.2,
    growthChange: 6.5,
  },
  yearly: {
    revenue: 15000.0,
    newCustomers: 14808,
    activeAccounts: 548136,
    growthRate: 54.0,
    revenueChange: 22.5,
    customersChange: -12.0,
    accountsChange: 18.5,
    growthChange: 8.5,
  },
};

export function SectionCards() {
  const [period, setPeriod] = useState<TimePeriod>("monthly");
  const data = mockData[period];

  return (
    <div className="space-y-4 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
          <p className="text-sm text-muted-foreground">
            Key metrics and statistics
          </p>
        </div>
        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as TimePeriod)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="half-yearly">Half Yearly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              Rs.
              {data.revenue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {data.revenueChange >= 0 ? <TrendingUp /> : <TrendingDown />}
                {data.revenueChange >= 0 ? "+" : ""}
                {data.revenueChange.toFixed(1)}%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {data.revenueChange >= 0 ? "Trending up" : "Trending down"} this{" "}
              {period === "monthly"
                ? "month"
                : period === "quarterly"
                ? "quarter"
                : period === "half-yearly"
                ? "half year"
                : "year"}{" "}
              {data.revenueChange >= 0 ? (
                <TrendingUp className="size-4" />
              ) : (
                <TrendingDown className="size-4" />
              )}
            </div>
            <div className="text-muted-foreground">
              Revenue for the{" "}
              {period === "monthly"
                ? "current month"
                : period === "quarterly"
                ? "current quarter"
                : period === "half-yearly"
                ? "current half year"
                : "current year"}
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>New Customers</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {data.newCustomers.toLocaleString()}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {data.customersChange >= 0 ? <TrendingUp /> : <TrendingDown />}
                {data.customersChange >= 0 ? "+" : ""}
                {data.customersChange.toFixed(1)}%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {data.customersChange >= 0 ? "Up" : "Down"}{" "}
              {Math.abs(data.customersChange)}% this{" "}
              {period === "monthly"
                ? "month"
                : period === "quarterly"
                ? "quarter"
                : period === "half-yearly"
                ? "half year"
                : "year"}{" "}
              {data.customersChange >= 0 ? (
                <TrendingUp className="size-4" />
              ) : (
                <TrendingDown className="size-4" />
              )}
            </div>
            <div className="text-muted-foreground">
              {data.customersChange >= 0
                ? "Strong customer growth"
                : "Acquisition needs attention"}
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Active Accounts</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {data.activeAccounts.toLocaleString()}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {data.accountsChange >= 0 ? <TrendingUp /> : <TrendingDown />}
                {data.accountsChange >= 0 ? "+" : ""}
                {data.accountsChange.toFixed(1)}%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {data.accountsChange >= 0
                ? "Strong user retention"
                : "Retention needs improvement"}{" "}
              {data.accountsChange >= 0 ? (
                <TrendingUp className="size-4" />
              ) : (
                <TrendingDown className="size-4" />
              )}
            </div>
            <div className="text-muted-foreground">
              {data.accountsChange >= 0
                ? "Engagement exceed targets"
                : "Focus on user engagement"}
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Growth Rate</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {data.growthRate.toFixed(1)}%
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {data.growthChange >= 0 ? <TrendingUp /> : <TrendingDown />}
                {data.growthChange >= 0 ? "+" : ""}
                {data.growthChange.toFixed(1)}%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {data.growthChange >= 0
                ? "Steady performance increase"
                : "Performance decline"}{" "}
              {data.growthChange >= 0 ? (
                <TrendingUp className="size-4" />
              ) : (
                <TrendingDown className="size-4" />
              )}
            </div>
            <div className="text-muted-foreground">
              {data.growthChange >= 0
                ? "Meets growth projections"
                : "Review growth strategy"}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
