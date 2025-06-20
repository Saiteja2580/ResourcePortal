"use client";

import React, { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/BookingTable";
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getResources ,Resource} from "@/services/resource";




const ResourcePage = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchResources = async () => {
      const res = await getResources();
      console.log(res);

      if (res.data) setResources(res.data);
    };
    fetchResources();
  }, []);

  const handleAddResource = () => {
    router.push("/admin/resources/new");
  };

  return (
    <div className="p-6">
      <DataTable columns={columns} data={resources} />
      <div className="w-full flex">
        <Button
          type="submit"
          className="bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] text-white hover:shadow-[var(--shadow-button)] transition-all duration-[var(--transition-smooth)] rounded-[var(--radius-sm)] text-lg px-5 py-2 my-3 mx-auto"
          onClick={handleAddResource}
        >
          Add Resource
        </Button>
      </div>
    </div>
  );
};

export default ResourcePage;
