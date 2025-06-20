"use client";

import { createClient } from "../../utils/supabase/client";
import { AddResourceSchema } from "@/models/resource";

const supabase = createClient();

// Reference table interfaces
export interface Department {
  id: string;
  name: string;
}

export interface ResourceType {
  id: string;
  type_name: string;
}

// Main Resource interface with optional foreign data
export interface Resource {
  capacity: number;
  created_at: string;
  dept_id: string;
  description: string;
  google_calender_id: string;
  is_active: boolean;
  name: string;
  resource_id: string;
  resource_type_id: string;
  updated_at: string;
  departments?: Department; // Joined department
  resource_types?: ResourceType; // Joined resource type
}

export type ResourceError = {
  message: string;
  code?: string;
  details?: string;
};

export type ResourceResponse = {
  data: Resource[] | null;
  error: ResourceError | null;
};

// ✅ Improved getResources with joins
export const getResources = async (): Promise<ResourceResponse> => {
  try {
    const { data: resources, error } = await supabase.from("resources").select(`
        *,
        departments:dept_id (
          dept_id,
          name
        ),
        resource_types:resource_type_id (
          id,
          name
        )
      `);

    if (error) {
      console.error("Supabase error fetching resources:", error);
      return {
        data: null,
        error: {
          message: "Failed to fetch resources",
          code: error.code,
          details: error.message,
        },
      };
    }

    return {
      data: resources,
      error: null,
    };
  } catch (error) {
    console.error("Unexpected error in getResources:", error);
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

// ✅ insertResource stays mostly the same
export async function insertResource(resource: AddResourceSchema) {
  const { data, error } = await supabase
    .from("resources")
    .insert([
      {
        name: resource.name,
        description: resource.description,
        capacity: resource.capacity,
        resource_type_id: resource.resource_type_id,
        google_calender_id: resource.google_calender_id,
        is_active: resource.is_active,
        dept_id: resource.dept_id,
      },
    ])
    .select(); // Returns inserted row(s)

  if (error) {
    console.error("Insert failed:", error);
    return {
      data: null,
      error: {
        message: "Failed to insert resource",
        code: error.code,
        details: error.message,
      },
    };
  }

  return { data, error: null };
}
