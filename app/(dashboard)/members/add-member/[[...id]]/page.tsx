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
import { Member, mockMembers } from "@/components/features/members/members-table";
import { mockPlans } from "@/components/features/membership-plans/membership-plans-table";
import { generateMemberId } from "@/lib/utils/member-id";

// Helper function to calculate expiration date based on join date and membership duration
function calculateExpirationDate(
  joinDate: string,
  membershipType: string
): string {
  const join = new Date(joinDate);
  const plan = mockPlans.find((p) => p.name === membershipType);

  if (!plan) {
    // Default to 1 month if plan not found
    join.setMonth(join.getMonth() + 1);
    return join.toISOString().split("T")[0];
  }

  const duration = plan.duration;
  if (duration.includes("year")) {
    join.setFullYear(join.getFullYear() + 1);
  } else if (duration.includes("month")) {
    const months = parseInt(duration.split(" ")[0]) || 1;
    join.setMonth(join.getMonth() + months);
  }

  return join.toISOString().split("T")[0];
}

// Helper function to get the next sequential number for a given join date
function getNextSequentialNumber(joinDate: string): number {
  const date = new Date(joinDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  // Filter existing members with the same year and month
  const sameMonthMembers = mockMembers.filter((member) => {
    const memberDate = new Date(member.joinDate);
    return (
      memberDate.getFullYear() === year && memberDate.getMonth() + 1 === month
    );
  });

  // Return the count + 1 for the next sequential number
  return sameMonthMembers.length + 1;
}

type MemberFormData = {
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  joinDate: string;
  expiryDate: string;
  status: "active" | "inactive" | "expired";
  paymentStatus: "paid" | "unpaid";
  paymentAmount: number;
};

export default function AddMemberPage() {
  const router = useRouter();
  const params = useParams();

  console.log("Params:", params);
  // Handle catch-all route: params.id will be an array or undefined
  const memberId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const isEditMode = !!memberId;
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(isEditMode);

  const form = useForm<MemberFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      membershipType: "",
      joinDate: new Date().toISOString().split("T")[0],
      expiryDate: "",
      status: "active",
      paymentStatus: "unpaid",
      paymentAmount: 0,
    },
  });

  // Calculate expiry date when join date or membership type changes
  const joinDate = form.watch("joinDate");
  const membershipType = form.watch("membershipType");

  useEffect(() => {
    if (joinDate && membershipType) {
      const calculatedExpiry = calculateExpirationDate(
        joinDate,
        membershipType
      );
      form.setValue("expiryDate", calculatedExpiry);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinDate, membershipType]);

  useEffect(() => {
    if (isEditMode && memberId) {
      // In a real app, this would be an API call
      const foundMember = mockMembers.find((m) => m.id === memberId);

      if (foundMember) {
        setMember(foundMember);
        form.reset({
          name: foundMember.name,
          email: foundMember.email,
          phone: foundMember.phone,
          membershipType: foundMember.membershipType,
          joinDate: foundMember.joinDate,
          expiryDate: foundMember.expiryDate,
          status: foundMember.status,
          paymentStatus: foundMember.paymentStatus,
          paymentAmount: foundMember.paymentAmount,
        });
      }
      setLoading(false);
    }
  }, [isEditMode, memberId, form]);

  const onSubmit = async (data: MemberFormData) => {
    try {
      if (isEditMode) {
        // TODO: Replace with actual API call
        console.log("Updating member:", memberId, data);
      } else {
        // Generate unique member ID using join date and sequential number
        const sequentialNumber = getNextSequentialNumber(data.joinDate);
        const newMemberId = generateMemberId(data.joinDate, sequentialNumber);

        // TODO: Replace with actual API call
        console.log("Adding member:", {
          ...data,
          id: newMemberId,
        });
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Redirect back to members page after successful submission
      router.push("/members");
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "adding"} member:`,
        error
      );
    }
  };

  if (loading) {
    return (
      <PageContent
        title={isEditMode ? "Edit Member" : "Add Member"}
        description={
          isEditMode
            ? "Edit member information"
            : "Add a new member to your gym"
        }
      >
        <div className="px-4 lg:px-6">Loading...</div>
      </PageContent>
    );
  }

  if (isEditMode && !member) {
    return (
      <PageContent title="Edit Member" description="Edit member information">
        <div className="px-4 lg:px-6">
          <Card>
            <CardContent className="pt-6">
              <p>Member not found</p>
              <Link href="/members">
                <Button variant="outline" className="mt-4">
                  Back to Members
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
      title={isEditMode ? "Edit Member" : "Add Member"}
      description={
        isEditMode ? "Edit member information" : "Add a new member to your gym"
      }
      headerAction={
        <Link href="/members">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Members
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
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    rules={{
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john.doe@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+1 234-567-8900"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    rules={{
                      required: "Phone number is required",
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="membershipType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Membership Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select membership type" />
                            </SelectTrigger>
                            <SelectContent align="start">
                              <SelectItem value="Basic">Basic</SelectItem>
                              <SelectItem value="Standard">Standard</SelectItem>
                              <SelectItem value="Premium">Premium</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    rules={{
                      required: "Membership type is required",
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="joinDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Join Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    rules={{
                      required: "Join date is required",
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    rules={{
                      required: "Expiry date is required",
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
                              <SelectItem value="expired">Expired</SelectItem>
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

                  <FormField
                    control={form.control}
                    name="paymentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select payment status" />
                            </SelectTrigger>
                            <SelectContent align="start">
                              <SelectItem value="paid">Paid</SelectItem>
                              <SelectItem value="unpaid">Unpaid</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    rules={{
                      required: "Payment status is required",
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="paymentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Amount (Rs.)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
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
                      required: "Payment amount is required",
                      min: {
                        value: 0,
                        message:
                          "Payment amount must be greater than or equal to 0",
                      },
                    }}
                  />
                </div>

                <div className="flex items-center gap-4 justify-end">
                  <Link href="/members">
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
                      ? "Update Member"
                      : "Add Member"}
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
