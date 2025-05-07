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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { RfpFormData } from '../../../schema/rfp-schema';

interface RfpTypeGroup {
  label: string;
  options: {
    value: string;
    label: string;
    icon?: string;
  }[];
}

export function StepOne() {
  const { control } = useFormContext<RfpFormData>();
  const [mounted, setMounted] = useState(false);
  const [typeOptions, setTypeOptions] = useState<RfpTypeGroup[]>([]);

  useEffect(() => {
    setMounted(true);

    const fetchOptions = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/rfp/options/types`, {
          credentials: 'include',
        });

        if (!res.ok) throw new Error(`HTTP error ${res.status}`);

        const json = await res.json();
        if (!Array.isArray(json)) throw new Error('Invalid typeOptions format');

        setTypeOptions(json);
      } catch (err) {
        console.error('Failed to fetch typeOfRfp options', err);
        setTypeOptions([]);
      }
    };

    fetchOptions();
  }, []);

  return (
    <div className="rounded-xl border bg-muted/50 p-6 shadow-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <FormField
          control={control}
          name="item"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Item (e.g. serial number)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={control}
          name="typeOfRfp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of RFP <span className="text-red-500">*</span></FormLabel>
              {mounted && typeOptions.length > 0 ? (
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                  <SelectTrigger className="select-trigger">
                  <SelectValue placeholder="Select RFP type..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {typeOptions.map((group) => (
                      <SelectGroup key={group.label}>
                        <span className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          {group.label}
                        </span>
                        {group.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.icon ? `${option.icon} ${option.label}` : option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-muted-foreground text-sm">Loading RFP types…</div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="rfpReference"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>RFP Reference <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="E.g. GHNT-RFP001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="xrefRfpList"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              {/* <FormLabel>XRef RFP List</FormLabel> */}
              <FormControl>
                {/* <Input placeholder="Internal Reference (optional)" {...field} /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}