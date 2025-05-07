'use client';

import { useFormContext } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { RfpFormData } from '../../../schema/rfp-schema';

export function StepEightDataCollection() {
  const { control } = useFormContext<RfpFormData>();

  const dataFields = [
    { name: 'manualMethod', label: 'Manual Data Collection Method' },
    { name: 'dataLogger', label: 'Data Logger Details' },
    { name: 'remoteReading', label: 'Remote Reading Method' },
    { name: 'outstationDetails', label: 'Outstation Details' },
    { name: 'storageDetails', label: 'Data Storage System & Locations' },
    { name: 'ubReport', label: 'UB Report Reference' },
    { name: 'ubValue', label: 'UB Value' },
    { name: 'dataManagementProcedure', label: 'Data Management Procedure' },
  ] as const;

  return (
    <div className="rounded-xl border bg-muted/50 p-6 shadow-sm space-y-10">
      <h2 className="text-lg font-semibold">Step 8: Data Collection and Exchange</h2>

      {/* Data Collection Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dataFields.map((fieldDef) => (
          <FormField
            key={fieldDef.name}
            control={control}
            name={`data.${fieldDef.name}` as keyof RfpFormData}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldDef.label}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={`Enter ${fieldDef.label.toLowerCase()}`}
                    {...field}
                    value={typeof field.value === 'string' ? field.value : ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>

      {/* MAF Section */}
      <div className="space-y-6 border-t pt-6">
        <h3 className="text-base font-semibold">Metrological Assurance Framework (MAF)</h3>

        <FormField
          control={control}
          name="maf.sopRef"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference to MAF Standard Operating Procedure</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter SOP reference"
                  {...field}
                  value={typeof field.value === 'string' ? field.value : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="maf.selectionSummary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flowmeter Selection Assessment Summary</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter summary"
                  {...field}
                  value={typeof field.value === 'string' ? field.value : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Flowmeter Action Section */}
      <div className="space-y-6 border-t pt-6">
        <h3 className="text-base font-semibold">Flowmeter Action</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <DatePicker
                    startYear={2000}
                    endYear={2100}
                    value={typeof field.value === 'string' ? field.value : undefined}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="completionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Completion Date</FormLabel>
                <FormControl>
                  <DatePicker
                    startYear={2000}
                    endYear={2100}
                    value={typeof field.value === 'string' ? field.value : undefined}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* RFP Conditions Section */}
      <div className="space-y-6 border-t pt-6">
        <h3 className="text-base font-semibold">RFP Conditions</h3>

        <FormField
          control={control}
          name="maf.detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RFP Conditions</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter RFP condition details"
                  {...field}
                  value={typeof field.value === 'string' ? field.value : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
