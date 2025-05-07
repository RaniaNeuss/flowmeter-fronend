'use client';

import { useFormContext } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RfpFormData } from '../../../schema/rfp-schema';
import { DatePicker } from '@/components/ui/date-picker';

export function StepTwo() {
  const { control, setValue } = useFormContext<RfpFormData>();

  const radioGroups = [
    {
      title: 'Wastewater Flow',
      options: [
        { id: 'inletToWwTreatment', label: 'Inlet to WW Treatment' },
        { id: 'outletFromWwTreatment', label: 'Outlet from WW Treatment' },
      ],
    },
    {
      title: 'Discharge Points',
      options: [
        { id: 'terminalPumpingOutput', label: 'Terminal Pumping Output' },
        { id: 'wastewaterTankerDischarge', label: 'Wastewater Tanker Discharge' },
      ],
    },
    {
      title: 'Other Options',
      options: [
        { id: 'tankerFillPoint', label: 'Tanker Fill Point' },
        { id: 'incidentReporting', label: 'Incident Reporting' },
      ],
    },
  ];

  const handleChange = (selectedId: keyof RfpFormData) => {
    radioGroups.flatMap((g) => g.options).forEach((option) => {
      setValue(option.id as keyof RfpFormData, false);
    });
    setValue(selectedId, true);
  };

  return (
    <div className="rounded-xl border bg-muted/50 p-6 shadow-sm space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <FormField
          control={control}
          name="generalInfo.licensee"
          render={({ field }) => (
            <FormItem>
              <label className="block text-sm font-medium">
                Licensee/Company <span className="text-red-500">*</span>
              </label>
              <FormControl>
                <Input placeholder="Enter Licensee" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="generalInfo.address"
          render={({ field }) => (
            <FormItem>
              <label className="block text-sm font-medium">
                Address <span className="text-red-500">*</span>
              </label>
              <FormControl>
                <Input placeholder="Enter Address" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="generalInfo.reportRef"
          render={({ field }) => (
            <FormItem>
              <label className="block text-sm font-medium">
                Report Reference <span className="text-red-500">*</span>
              </label>
              <FormControl>
                <Input placeholder="Enter Report Reference" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
  control={control}
  name="generalInfo.reportDate"
  render={({ field }) => (
    <FormItem>
      <label className="block text-sm font-medium">
        Report Date <span className="text-red-500">*</span>
      </label>
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
          name="generalInfo.contactNumber"
          render={({ field }) => (
            <FormItem>
              <label className="block text-sm font-medium">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <FormControl>
                <Input placeholder="Enter Contact Number" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="generalInfo.faxNumber"
          render={({ field }) => (
            <FormItem>
              <label className="block text-sm font-medium">Fax Number</label>
              <FormControl>
                <Input placeholder="Enter Fax Number" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="generalInfo.responsiblePosition"
          render={({ field }) => (
            <FormItem>
              <label className="block text-sm font-medium">
                Responsible person for flowmeter location – Position title
              </label>
              <FormControl>
                <Input placeholder="Enter position title" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="generalInfo.responsibleDepartment"
          render={({ field }) => (
            <FormItem>
              <label className="block text-sm font-medium">
                Responsible person for flowmeter location – Department
              </label>
              <FormControl>
                <Input placeholder="Enter department" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {radioGroups.map((group) => (
        <div key={group.title} className="space-y-3">
          <h3 className="text-base font-semibold">{group.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {group.options.map((option) => (
              <FormField
                key={option.id}
                control={control}
                name={option.id as keyof RfpFormData}
                render={({ field }) => (
                  <FormItem>
                    <label
                      className={`flex items-center space-x-3 p-3 rounded-md border cursor-pointer ${
                        field.value ? 'border-primary bg-primary/10' : 'hover:bg-muted'
                      }`}
                    >
                      <FormControl>
                        <input
                          type="radio"
                          name={group.title}
                          checked={field.value === true}
                          onChange={() => handleChange(option.id as keyof RfpFormData)}
                          className="h-4 w-4"
                        />
                      </FormControl>
                      <span className="text-sm font-medium">{option.label}</span>
                    </label>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
