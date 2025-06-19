"use client";

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
import { useEffect, useState } from "react";
import { getDepartments, type Department } from "@/services/department";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  department: z.string({ required_error: "Please select a department." }),
  role: z.enum(["admin", "faculty"], {
    required_error: "Please select a role.",
  }),
});

export default function AddUserPage() {
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
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // TODO: Implement the API call to create user
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-[var(--font-heading)] mb-6 text-[var(--text-primary)]">
        Add New User
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] border border-[var(--color-gray-light)]"
        >
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
                    className="text-base md:text-lg border-[var(--color-gray-light)] focus:border-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)] rounded-[var(--radius-sm)]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base md:text-lg text-[var(--text-secondary)] font-[var(--font-body)]">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email"
                    type="email"
                    className=" text-base md:text-lg border-[var(--color-gray-light)] focus:border-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)] rounded-[var(--radius-sm)]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base md:text-lgtext-[var(--text-secondary)] font-[var(--font-body)]">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter password"
                    type="password"
                    className=" text-base md:text-lg border-[var(--color-gray-light)] focus:border-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)] rounded-[var(--radius-sm)]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base md:text-lg text-[var(--text-secondary)] font-[var(--font-body)]">
                  Department
                </FormLabel>{" "}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger className="text-base md:text-lg border-[var(--color-gray-light)] focus:border-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)] rounded-[var(--radius-sm)]">
                      <SelectValue
                        placeholder={
                          isLoading
                            ? "Loading departments..."
                            : "Select department"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="text-base md:text-lg border-[var(--color-gray-light)] shadow-[var(--shadow-card)] rounded-[var(--radius-sm)]">
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
                          value={dept.name}
                          className=" text-base md:text-lg hover:bg-[var(--color-purple-light)] hover:text-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)]"
                        >
                          {dept.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base md:text-lg text-[var(--text-secondary)] font-[var(--font-body)]">
                  Role
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-base md:text-lg border-[var(--color-gray-light)] focus:border-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)] rounded-[var(--radius-sm)]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-[var(--color-gray-light)] shadow-[var(--shadow-card)] rounded-[var(--radius-sm)]">
                    <SelectItem
                      value="admin"
                      className="text-base md:text-lg hover:bg-[var(--color-purple-light)] hover:text-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)]"
                    >
                      Admin
                    </SelectItem>
                    <SelectItem
                      value="faculty"
                      className="text-base md:text-lg hover:bg-[var(--color-purple-light)] hover:text-[var(--color-purple-main)] transition-colors duration-[var(--transition-smooth)]"
                    >
                      Faculty
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />{" "}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] text-white hover:shadow-[var(--shadow-button)] transition-all duration-[var(--transition-smooth)] rounded-[var(--radius-sm)] text-lg"
          >
            Add User
          </Button>
        </form>
      </Form>
    </div>
  );
}
