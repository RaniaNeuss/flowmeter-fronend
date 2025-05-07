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
import { DatePicker } from '@/components/ui/date-picker'; // ✅ Import DatePicker
import { RfpFormData } from '../../../schema/rfp-schema';

export function StepFiveFlowmeterDetails() {
  const { control } = useFormContext<RfpFormData>();

  return (
    <div className="rounded-xl border bg-muted/50 p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">Flowmeter Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Flow Diagram Reference */}
        <FormField
          control={control}
          name="location.flowDiagramRef"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flow Diagram Reference</FormLabel>
              <FormControl>
                <Input placeholder="Enter flow diagram reference" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Flow Measurement Option */}
        <FormField
          control={control}
          name="flowMeasurement.selectedOption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flow Measurement Option</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="cumulativeFlow"
                      checked={field.value === 'cumulativeFlow'}
                      onChange={field.onChange}
                    />
                    Cumulative Flow
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="fifteenMinFlow"
                      checked={field.value === 'fifteenMinFlow'}
                      onChange={field.onChange}
                    />
                    15 Min Flow
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="eventRecording"
                      checked={field.value === 'eventRecording'}
                      onChange={field.onChange}
                    />
                    Event Recording
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Meter Install Date (use DatePicker) */}
        <FormField
          control={control}
          name="flowMonitoring.installation.meterInstallDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meter Install Date</FormLabel>
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

        {/* Meter Removal Date (use DatePicker) */}
        <FormField
          control={control}
          name="flowMonitoring.installation.meterRemovalDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meter Removal Date</FormLabel>
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
  );
}
