"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { PageContent } from "@/components/ui/page-content";
import { SiteHeader } from "@/components/ui/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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

type MemberFormData = {
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  joinDate: string;
  status: "active" | "inactive" | "expired";
};

export default function AddMemberPage() {
  const router = useRouter();
  const form = useForm<MemberFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      membershipType: "",
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
    },
  });

  const onSubmit = async (data: MemberFormData) => {
    try {
      // TODO: Replace with actual API call
      console.log("Adding member:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Redirect back to members page after successful submission
      router.push("/members");
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <PageContent
          title="Add Member"
          description="Add a new member to your gym"
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
                                  <SelectItem value="Standard">
                                    Standard
                                  </SelectItem>
                                  <SelectItem value="Premium">
                                    Premium
                                  </SelectItem>
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
                                  <SelectItem value="inactive">
                                    Inactive
                                  </SelectItem>
                                  <SelectItem value="expired">
                                    Expired
                                  </SelectItem>
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

                    <div className="flex items-center gap-4 justify-end">
                      <Link href="/members">
                        <Button type="button" variant="outline">
                          Cancel
                        </Button>
                      </Link>
                      <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting
                          ? "Adding..."
                          : "Add Member"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </PageContent>
      </SidebarInset>
    </SidebarProvider>
  );
}
