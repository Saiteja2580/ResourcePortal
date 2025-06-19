"use client";

import { createClient } from "../../utils/supabase/client";

// Define types
export type Department = {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
};

export type DepartmentError = {
  message: string;
  code?: string;
  details?: string;
};

export type DepartmentResponse = {
  data: Department[] | null;
  error: DepartmentError | null;
};

const supabase = createClient();

export const getDepartments = async (): Promise<DepartmentResponse> => {
  try {
    const { data: departments, error } = await supabase
      .from("departments")
      .select("*")
      .order("name", { ascending: true });
    console.log(departments);

    if (error) {
      return {
        data: null,
        error: {
          message: "Failed to fetch departments",
          code: error.code,
          details: error.message,
        },
      };
    }

    return {
      data: departments,
      error: null,
    };
  } catch (error) {
    console.error("Unexpected error in getDepartments:", error);
    return {
      data: null,
      error: {
        message: "An unexpected error occurred",
        code: "UNKNOWN_ERROR",
        details:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
    };
  }
};
