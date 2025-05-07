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

export function StepSevenFlowmeterInstallation() {
  const { control } = useFormContext<RfpFormData>();

  const installationFields = [
    { name: 'meterInstallDate', label: 'Meter Install Date', type: 'date' },
    { name: 'meterRemovalDate', label: 'Meter Removal Date', type: 'date' },
    { name: 'hydraulicUpstream', label: 'Hydraulic Upstream', type: 'text' },
    { name: 'hydraulicDownstream', label: 'Hydraulic Downstream', type: 'text' },
    { name: 'environmental', label: 'Environmental', type: 'text' },
    { name: 'onSiteTesting', label: 'On-site Testing', type: 'text' },
    { name: 'safetyRisks', label: 'Safety Risks', type: 'text' },
    { name: 'securityOfLocation', label: 'Security of Location', type: 'text' },
  ] as const;

  return (
    <div className="rounded-xl border bg-muted/50 p-6 shadow-sm space-y-8">
      <h2 className="text-lg font-semibold">Step 7: Flowmeter Installation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {installationFields.map((fieldDef) => (
          <FormField
            key={fieldDef.name}
            control={control}
            name={`flowMonitoring.installation.${fieldDef.name}` as keyof RfpFormData}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldDef.label}</FormLabel>
                <FormControl>
                  {fieldDef.type === 'date' ? (
                    <DatePicker
                      startYear={2000}
                      endYear={2100}
                      value={typeof field.value === 'string' ? field.value : undefined}
                      onChange={field.onChange}
                    />
                  ) : (
                    <Input
                      type="text"
                      placeholder={`Enter ${fieldDef.label.toLowerCase()}`}
                      {...field}
                      value={typeof field.value === 'string' ? field.value : ''}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>

      <div className="space-y-4 pt-6 border-t">
        <h3 className="text-base font-semibold">Flowmeter Maintenance</h3>

        <FormField
          control={control}
          name="flowMonitoring.maintenance.maintenanceRef"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Reference to corrective &amp; preventative maintenance procedures
              </FormLabel>
              <FormControl>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="true"
                      checked={field.value === true}
                      onChange={() => field.onChange(true)}
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="false"
                      checked={field.value === false}
                      onChange={() => field.onChange(false)}
                    />
                    No
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="flowMonitoring.maintenance.preventativeScheduleRef"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Reference to preventative maintenance programme/schedule
              </FormLabel>
              <FormControl>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="true"
                      checked={field.value === true}
                      onChange={() => field.onChange(true)}
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="false"
                      checked={field.value === false}
                      onChange={() => field.onChange(false)}
                    />
                    No
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
