"use client";

import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { PageContent } from "@/components/ui/page-content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MembershipPlan } from "../../membership-plans-table";

type MembershipPlanFormData = {
  name: string;
  price: number;
  duration: string;
  features: string;
  status: "active" | "inactive";
};

// Mock plans data - in a real app, this would be fetched from an API
const mockPlans: MembershipPlan[] = [
  {
    id: "1",
    name: "Basic",
    price: 29.99,
    duration: "1 month",
    features: "Access to gym facilities, Basic equipment",
    status: "active",
  },
  {
    id: "2",
    name: "Standard",
    price: 79.99,
    duration: "3 months",
    features: "Access to gym facilities, All equipment, Group classes",
    status: "active",
  },
  {
    id: "3",
    name: "Premium",
    price: 299.99,
    duration: "1 year",
    features:
      "Access to gym facilities, All equipment, Group classes, Personal trainer sessions, Nutrition consultation",
    status: "active",
  },
  {
    id: "4",
    name: "Student",
    price: 19.99,
    duration: "1 month",
    features: "Access to gym facilities, Basic equipment (Student ID required)",
    status: "active",
  },
  {
    id: "5",
    name: "Senior",
    price: 24.99,
    duration: "1 month",
    features:
      "Access to gym facilities, Basic equipment, Senior-friendly classes",
    status: "active",
  },
  {
    id: "6",
    name: "Corporate",
    price: 249.99,
    duration: "1 year",
    features:
      "Access to gym facilities, All equipment, Group classes, Corporate wellness programs",
    status: "inactive",
  },
];

export default function AddMembershipPlanPage() {
  const router = useRouter();
  const params = useParams();
  // Handle catch-all route: params.id will be an array or undefined
  const planId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const isEditMode = !!planId;
  const [plan, setPlan] = useState<MembershipPlan | null>(null);
  const [loading, setLoading] = useState(isEditMode);

  const form = useForm<MembershipPlanFormData>({
    defaultValues: {
      name: "",
      price: 0,
      duration: "1 month",
      features: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (isEditMode && planId) {
      // In a real app, this would be an API call
      const foundPlan = mockPlans.find((p) => p.id === planId);

      if (foundPlan) {
        setPlan(foundPlan);
        form.reset({
          name: foundPlan.name,
          price: foundPlan.price,
          duration: foundPlan.duration,
          features: foundPlan.features,
          status: foundPlan.status,
        });
      }
      setLoading(false);
    }
  }, [isEditMode, planId, form]);

  const onSubmit = async (data: MembershipPlanFormData) => {
    try {
      if (isEditMode) {
        // TODO: Replace with actual API call
        console.log("Updating membership plan:", planId, data);
      } else {
        // TODO: Replace with actual API call
        console.log("Adding membership plan:", data);
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Redirect back to membership plans page after successful submission
      router.push("/membership-plans");
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "adding"} membership plan:`,
        error
      );
    }
  };

  if (loading) {
    return (
      <PageContent
        title={isEditMode ? "Edit Membership Plan" : "Add Membership Plan"}
        description={
          isEditMode
            ? "Edit membership plan information"
            : "Add a new membership plan"
        }
      >
        <div className="px-4 lg:px-6">Loading...</div>
      </PageContent>
    );
  }

  if (isEditMode && !plan) {
    return (
      <PageContent
        title="Edit Membership Plan"
        description="Edit membership plan information"
      >
        <div className="px-4 lg:px-6">
          <Card>
            <CardContent className="pt-6">
              <p>Membership plan not found</p>
              <Link href="/membership-plans">
                <Button variant="outline" className="mt-4">
                  Back to Membership Plans
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    );
  }

  return (
    <PageContent
      title={isEditMode ? "Edit Membership Plan" : "Add Membership Plan"}
      description={
        isEditMode
          ? "Edit membership plan information"
          : "Add a new membership plan"
      }
      headerAction={
        <Link href="/membership-plans">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Membership Plans
          </Button>
        </Link>
      }
    >
      <div className="px-4 lg:px-6 space-y-4">
        <Card>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Basic" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    rules={{
                      required: "Plan name is required",
                      minLength: {
                        value: 2,
                        message: "Plan name must be at least 2 characters",
                      },
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (Rs.)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="29.99"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    rules={{
                      required: "Price is required",
                      min: {
                        value: 0,
                        message: "Price must be greater than or equal to 0",
                      },
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent align="start">
                              <SelectItem value="1 month">1 month</SelectItem>
                              <SelectItem value="3 months">3 months</SelectItem>
                              <SelectItem value="6 months">6 months</SelectItem>
                              <SelectItem value="1 year">1 year</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    rules={{
                      required: "Duration is required",
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent align="start">
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    rules={{
                      required: "Status is required",
                    }}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features</FormLabel>
                      <FormControl>
                        <textarea
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Access to gym facilities, Basic equipment, Group classes..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  rules={{
                    required: "Features are required",
                  }}
                />

                <div className="flex items-center gap-4 justify-end">
                  <Link href="/membership-plans">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting
                      ? isEditMode
                        ? "Updating..."
                        : "Adding..."
                      : isEditMode
                      ? "Update Membership Plan"
                      : "Add Membership Plan"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </PageContent>
  );
}
