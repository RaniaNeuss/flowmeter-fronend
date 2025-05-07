'use client';

import FlowMeterFormWizard from "@/components/forms/flow-meter";

export default function FlowMeterFormPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Add Flow Meter</h1>
      <FlowMeterFormWizard />
    </div>
  );
}
