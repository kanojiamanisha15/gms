"use client";

import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { Member } from "../../members-table";

type MemberFormData = {
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  joinDate: string;
  status: "active" | "inactive" | "expired";
};

// Mock members data - in a real app, this would be fetched from an API
const mockMembers: Member[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234-567-8900",
    membershipType: "Premium",
    joinDate: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 234-567-8901",
    membershipType: "Basic",
    joinDate: "2024-02-20",
    status: "active",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "+1 234-567-8902",
    membershipType: "Premium",
    joinDate: "2023-12-10",
    status: "expired",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    phone: "+1 234-567-8903",
    membershipType: "Standard",
    joinDate: "2024-03-05",
    status: "active",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: "+1 234-567-8904",
    membershipType: "Basic",
    joinDate: "2024-01-28",
    status: "inactive",
  },
  {
    id: "6",
    name: "Diana Prince",
    email: "diana.prince@example.com",
    phone: "+1 234-567-8905",
    membershipType: "Premium",
    joinDate: "2024-02-14",
    status: "active",
  },
  {
    id: "7",
    name: "Edward Norton",
    email: "edward.norton@example.com",
    phone: "+1 234-567-8906",
    membershipType: "Standard",
    joinDate: "2023-11-30",
    status: "expired",
  },
  {
    id: "8",
    name: "Fiona Green",
    email: "fiona.green@example.com",
    phone: "+1 234-567-8907",
    membershipType: "Basic",
    joinDate: "2024-03-20",
    status: "active",
  },
  {
    id: "9",
    name: "George White",
    email: "george.white@example.com",
    phone: "+1 234-567-8908",
    membershipType: "Premium",
    joinDate: "2024-01-10",
    status: "active",
  },
  {
    id: "10",
    name: "Hannah Black",
    email: "hannah.black@example.com",
    phone: "+1 234-567-8909",
    membershipType: "Standard",
    joinDate: "2024-02-28",
    status: "inactive",
  },
  {
    id: "11",
    name: "Ian Gray",
    email: "ian.gray@example.com",
    phone: "+1 234-567-8910",
    membershipType: "Basic",
    joinDate: "2023-10-15",
    status: "expired",
  },
  {
    id: "12",
    name: "Julia Red",
    email: "julia.red@example.com",
    phone: "+1 234-567-8911",
    membershipType: "Premium",
    joinDate: "2024-03-12",
    status: "active",
  },
];

export default function AddMemberPage() {
  const router = useRouter();
  const params = useParams();
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
      status: "active",
    },
  });

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
          status: foundMember.status,
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
        // TODO: Replace with actual API call
        console.log("Adding member:", data);
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
            title={isEditMode ? "Edit Member" : "Add Member"}
            description={
              isEditMode
                ? "Edit member information"
                : "Add a new member to your gym"
            }
          >
            <div className="px-4 lg:px-6">Loading...</div>
          </PageContent>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  if (isEditMode && !member) {
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
            title="Edit Member"
            description="Edit member information"
          >
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
        </SidebarInset>
      </SidebarProvider>
    );
  }

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
          title={isEditMode ? "Edit Member" : "Add Member"}
          description={
            isEditMode
              ? "Edit member information"
              : "Add a new member to your gym"
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
      </SidebarInset>
    </SidebarProvider>
  );
}
