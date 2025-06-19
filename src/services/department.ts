"use client";

import { createClient } from "../../utils/supabase/client";

// Define types
export type Department = {
  dept_id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
};

export type ResourceType = {
  id:string;
  name:string;
  description:string;
}

export type DepartmentError = {
  message: string;
  code?: string;
  details?: string;
};

export type ResourceTypeError = {
  message:string;
  code?:string;
  details?:string;
}

export type DepartmentResponse = {
  data: Department[] | null;
  error: DepartmentError | null;
};

export type ResourceTypeResponse = {
  data : ResourceType[]|null;
  error:ResourceTypeError|null;
}

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


export const getResourceTypes = async (): Promise<ResourceTypeResponse> => {
  try {
    const { data: resourceTypes, error } = await supabase
      .from("resource_types")
      .select("*")
      .order("name", { ascending: true });
    console.log(resourceTypes);

    if (error) {
      return {
        data: null,
        error: {
          message: "Failed to fetch resource_types",
          code: error.code,
          details: error.message,
        },
      };
    }

    return {
      data: resourceTypes,
      error: null,
    };
  } catch (error) {
    console.error("Unexpected error in getResourceTypes:", error);
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
