"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Resource } from "@/services/resource";

export const columns: ColumnDef<Resource>[] = [
  { accessorKey: "resource_id", header: "Resource ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "departments.name", header: "Department" },
  { accessorKey: "capacity", header: "Capacity" },
  { accessorKey: "resource_types.name", header: "Resource Type" },
  { accessorKey: "is_active", header: "Active" },
  
];