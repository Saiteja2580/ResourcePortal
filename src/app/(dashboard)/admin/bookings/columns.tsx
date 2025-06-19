"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Booking = {
  booking_id: string
  faculty_id:string
  resource_id:string
  event_title:string
  event_description:string
  expected_attendees:number
  date:string
  startTime:string
  endTime:string
  dept_id:string
  status: "pending" | "processing" | "success" | "failed"
}

export const columns: ColumnDef<Booking>[] = [
  { accessorKey: "booking_id", header: "Booking ID" },
  { accessorKey: "faculty_id", header: "Faculty ID" },
  { accessorKey: "resource_id", header: "Resource ID" },
  { accessorKey: "event_title", header: "Event Title" },
  { accessorKey: "event_description", header: "Event Description" },
  { accessorKey: "expected_attendees", header: "Expected Attendees" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "startTime", header: "Start Time" },
  { accessorKey: "endTime", header: "End Time" },
  { accessorKey: "dept_id", header: "Department ID" },
  { accessorKey: "status", header: "Status" },
];