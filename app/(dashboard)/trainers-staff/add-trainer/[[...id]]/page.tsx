"use client";

import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useState, useMemo, startTransition } from "react";
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
import { Trainer } from "@/components/features/trainers-staff/trainers-table";

type TrainerFormData = {
  name: string;
  email: string;
  phone: string;
  role: "trainer" | "staff";
  hireDate: string;
  status: "active" | "inactive";
};

const roleLabels: Record<TrainerFormData["role"], string> = {
  trainer: "Trainer",
  staff: "Staff",
};
const statusLabels: Record<TrainerFormData["status"], string> = {
  active: "Active",
  inactive: "Inactive",
};

const mockTrainers: Trainer[] = [
  {
    id: "1",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 234-567-9000",
    role: "Trainer",
    hireDate: "2023-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 234-567-9001",
    role: "Trainer",
    hireDate: "2023-03-20",
    status: "active",
  },
  {
    id: "3",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 234-567-9002",
    role: "Staff",
    hireDate: "2022-11-10",
    status: "active",
  },
];

export default function AddTrainerPage() {
  const router = useRouter();
  const params = useParams();
  const trainerId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const isEditMode = !!trainerId;
  const [loading, setLoading] = useState(isEditMode);

  const trainer = useMemo(() => {
    if (isEditMode && trainerId) {
      return mockTrainers.find((t) => t.id === trainerId) || null;
    }
    return null;
  }, [isEditMode, trainerId]);

  const form = useForm<TrainerFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "trainer",
      hireDate: new Date().toISOString().split("T")[0],
      status: "active",
    },
  });

  useEffect(() => {
    if (trainer) {
      form.reset({
        name: trainer.name,
        email: trainer.email,
        phone: trainer.phone,
        role: trainer.role as "trainer" | "staff",
        hireDate: trainer.hireDate,
        status: trainer.status,
      });
      startTransition(() => {
        setLoading(false);
      });
    } else if (isEditMode) {
      startTransition(() => {
        setLoading(false);
      });
    }
  }, [trainer, form, isEditMode]);

  const onSubmit = async (data: TrainerFormData) => {
    try {
      if (isEditMode) {
        console.log("Updating trainer:", trainerId, data);
      } else {
        console.log("Adding trainer:", data);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/trainers-staff");
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "adding"} trainer:`,
        error
      );
    }
  };

  if (loading) {
    return (
      <PageContent
        title={isEditMode ? "Edit Trainer/Staff" : "Add Trainer/Staff"}
        description={
          isEditMode
            ? "Edit trainer/staff information"
            : "Add a new trainer or staff member"
        }
      >
        <div className="px-4 lg:px-6">Loading...</div>
      </PageContent>
    );
  }

  if (isEditMode && !trainer) {
    return (
      <PageContent
        title="Edit Trainer/Staff"
        description="Edit trainer/staff information"
      >
        <div className="px-4 lg:px-6">
          <Card>
            <CardContent className="pt-6">
              <p>Trainer/Staff not found</p>
              <Link href="/trainers-staff">
                <Button variant="outline" className="mt-4">
                  Back to Trainers/Staff
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
      title={isEditMode ? "Edit Trainer/Staff" : "Add Trainer/Staff"}
      description={
        isEditMode
          ? "Edit trainer/staff information"
          : "Add a new trainer or staff member"
      }
      headerAction={
        <Link href="/trainers-staff">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Trainers/Staff
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
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select role" labels={roleLabels} />
                            </SelectTrigger>
                            <SelectContent align="start">
                              <SelectItem value="trainer">Trainer</SelectItem>
                              <SelectItem value="staff">Staff</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    rules={{
                      required: "Role is required",
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="hireDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hire Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    rules={{
                      required: "Hire date is required",
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
                              <SelectValue placeholder="Select status" labels={statusLabels} />
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

                <div className="flex items-center gap-4 justify-end">
                  <Link href="/trainers-staff">
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
                      ? "Update Trainer/Staff"
                      : "Add Trainer/Staff"}
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
