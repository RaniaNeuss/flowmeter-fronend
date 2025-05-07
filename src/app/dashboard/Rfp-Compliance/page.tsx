"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

import { RfpFormData } from "@/types";
// ← point at the file where you now export “RfpDataTable”
import { RfpDataTable } from "../Rfp-Compliance/RfpExcelStyleTable";
import { RfpDetailsModal } from "../Rfp-Compliance/RfpDetailsModal";

export default function RfpCompliancePage() {
  const [data, setData] = useState<RfpFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selectedRfp, setSelectedRfp] = useState<RfpFormData | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/rfp/filter`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page, limit: 10 }),
        }
      );

      if (res.status === 401) {
        setUnauthorized(true);
        return;
      }

      const result = await res.json();
      setData(Array.isArray(result.data) ? result.data : []);
      setLastPage(result.meta?.lastPage || 1);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load RFPs");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleEdit = (id: number) => {
    const record = data.find((d) => d.id === id);
    if (!record) return;

    localStorage.setItem("rfp-draft", JSON.stringify(record));
    localStorage.setItem("rfp-edit-id", String(id));
    router.push("/dashboard/flow-meter-form");
  };

  const handleViewDetails = (id: number) => {
    const record = data.find((d) => d.id === id);
    if (record) {
      setSelectedRfp(record);
    }
  };

  if (unauthorized) {
    return (
      <div className="text-center text-red-500 mt-8 font-semibold">
        Unauthorized. Please login.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[95vw] mx-auto space-y-6">
      <RfpDataTable
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onViewDetails={handleViewDetails}
      />

      <div className="flex justify-center items-center space-x-4 pt-4">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <span className="text-sm font-semibold">
          Page {page} of {lastPage}
        </span>
        <Button
          variant="outline"
          disabled={page >= lastPage}
          onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
        >
          Next
        </Button>
      </div>

      {selectedRfp && (
        <RfpDetailsModal
          rfp={selectedRfp}
          onClose={() => setSelectedRfp(null)}
        />
      )}
    </div>
  );
}
