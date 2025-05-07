'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { RfpFormData } from '../../../schema/rfp-schema';
import { DatePicker } from '@/components/ui/date-picker';
import { RfpDateField } from '@/types';

export function StepThree() {
  const { control } = useFormContext<RfpFormData>();

  const fields: RfpDateField[] = [
    { name: 'approvalExpiry', label: 'Approval Expiry' },
    { name: 'approvedReapplication', label: 'Approved Reapplication' },
    { name: 'appealApplication', label: 'Appeal Application' },
    { name: 'appealExtensionApplication', label: 'Appeal Extension Application' },
    { name: 'appealExtensionDecision', label: 'Appeal Extension Decision' },
    { name: 'panelAppealMeeting', label: 'Panel Appeal Meeting' },
    { name: 'panelAppealDecisionDate', label: 'Panel Appeal Decision Date' },
    { name: 'doeAppealDecisionDate', label: 'DOE Appeal Decision Date' },
    { name: 'panelAppealFinalResult', label: 'Panel Final Result (APP/REJ)', type: 'text' },
  ];

  return (
    <div className="rounded-xl border bg-muted/50 p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">Appeals & Decision Dates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((fieldDef) => (
          <FormField
            key={fieldDef.name}
            control={control}
            name={fieldDef.name as keyof RfpFormData}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  {fieldDef.label}
                </FormLabel>
                <FormControl>
                  {fieldDef.type === 'text' ? (
                    <Input
                      {...field}
                      value={typeof field.value === 'string' || typeof field.value === 'number'
                        ? field.value
                        : ''}
                      placeholder="e.g., APPROVED or REJECTED"
                    />
                  ) : (
                    <DatePicker
  startYear={2000}
  endYear={2100}
  value={typeof field.value === 'string' ? field.value : undefined}
  onChange={field.onChange}
/>

                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
}
