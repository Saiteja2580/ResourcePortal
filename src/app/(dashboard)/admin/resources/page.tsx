"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDepartments, type Department } from "@/services/department";

const formSchema = z.object({
  resource_id: z.string().min(1, { message: "Resource ID is required." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(1, { message: "Description is required." }),
  capacity: z.string().min(1, { message: "Capacity is required." }),
  resource_type_id: z.string({
    required_error: "Please select a resource type.",
  }),
  google_calender_id: z
    .string()
    .min(1, { message: "Google Calendar ID is required." }),
  is_active: z.boolean({ required_error: "Please select active status." }),
  dept_id: z.string({ required_error: "Please select a department." }),
});

const resourceTypes = [
  { id: "classroom", name: "Classroom" },
  { id: "lab", name: "Lab" },
  { id: "auditorium", name: "Auditorium" },
];

export default function ResourcePage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getDepartments();
        if (response.error) {
          setError(response.error.message);
        } else if (response.data) {
          setDepartments(response.data);
        }
      } catch (err) {
        setError("Failed to fetch departments");
        console.error("Error fetching departments:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      capacity: "",
      resource_type_id: "",
      google_calender_id: "",
      is_active: true,
      dept_id: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // TODO: Implement the API call to create/update resource
  }

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-2xl font-[var(--font-heading)] mb-6 text-[var(--text-primary)]">
        Add New Resource
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" shadow-lg bg-[var(--color-white)] p-8 md:p-12 rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] border border-[var(--color-gray-light)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-secondary)] font-[var(--font-body)] text-base md:text-lg">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter name"
                      className="border-[var(--color-gray-light)] focus:border-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)] rounded-[var(--radius-sm)] bg-[var(--color-white)] text-[var(--text-primary)] text-base md:text-lg px-4 py-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-secondary)] font-[var(--font-body)] text-base md:text-lg">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter description"
                      className="border-[var(--color-gray-light)] focus:border-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)] rounded-[var(--radius-sm)] bg-[var(--color-white)] text-[var(--text-primary)] text-base md:text-lg px-4 py-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-secondary)] font-[var(--font-body)] text-base md:text-lg">
                    Capacity
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter capacity"
                      className="border-[var(--color-gray-light)] focus:border-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)] rounded-[var(--radius-sm)] bg-[var(--color-white)] text-[var(--text-primary)] text-base md:text-lg px-4 py-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resource_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-secondary)] font-[var(--font-body)] text-base md:text-lg">
                    Resource Type
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-[var(--color-gray-light)] focus:border-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)] rounded-[var(--radius-sm)] bg-[var(--color-white)] text-[var(--text-primary)] text-base md:text-lg px-4 py-2">
                        <SelectValue placeholder="Select resource type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resourceTypes.map((type) => (
                        <SelectItem
                          key={type.id}
                          value={type.id}
                          className="hover:bg-[var(--color-purple-light)] hover:text-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)]"
                        >
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="google_calender_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-secondary)] font-[var(--font-body)] text-base md:text-lg">
                    Google Calendar ID
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Google Calendar ID"
                      className="border-[var(--color-gray-light)] focus:border-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)] rounded-[var(--radius-sm)] bg-[var(--color-white)] text-[var(--text-primary)] text-base md:text-lg px-4 py-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-secondary)] font-[var(--font-body)] text-base md:text-lg">
                    Active Status
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value ? "true" : "false"}
                  >
                    <FormControl>
                      <SelectTrigger className="border-[var(--color-gray-light)] focus:border-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)] rounded-[var(--radius-sm)] bg-[var(--color-white)] text-[var(--text-primary)] text-base md:text-lg px-4 py-2">
                        <SelectValue placeholder="Select active status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="true"
                        className="hover:bg-[var(--color-purple-light)] hover:text-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)]"
                      >
                        Active
                      </SelectItem>
                      <SelectItem
                        value="false"
                        className="hover:bg-[var(--color-purple-light)] hover:text-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)]"
                      >
                        Inactive
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dept_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-secondary)] font-[var(--font-body)] text-base md:text-lg">
                    Department
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="border-[var(--color-gray-light)] focus:border-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)] rounded-[var(--radius-sm)] bg-[var(--color-white)] text-[var(--text-primary)] text-base md:text-lg px-4 py-2">
                        <SelectValue
                          placeholder={
                            isLoading
                              ? "Loading departments..."
                              : "Select department"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {error ? (
                        <SelectItem value="error" disabled>
                          Error loading departments
                        </SelectItem>
                      ) : departments.length === 0 && !isLoading ? (
                        <SelectItem value="empty" disabled>
                          No departments available
                        </SelectItem>
                      ) : (
                        departments.map((dept) => (
                          <SelectItem
                            key={dept.id}
                            value={dept.id.toString()}
                            className="hover:bg-[var(--color-purple-light)] hover:text-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)]"
                          >
                            {dept.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-10 bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] text-white hover:shadow-[var(--shadow-button)] transition-all duration-[var(--transition-smooth)] rounded-[var(--radius-md)] text-lg py-3 font-semibold"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
