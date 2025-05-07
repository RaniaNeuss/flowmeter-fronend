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
import { RfpFormData } from '../../../schema/rfp-schema';

export function StepSixFlowmeterInventory() {
  const { control } = useFormContext<RfpFormData>();

  return (
    <div className="rounded-xl border bg-muted/50 p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">Step 6: Flowmeter Inventory</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="flowMonitoring.inventory.make"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Make</FormLabel>
              <FormControl>
                <Input placeholder="Enter make" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="flowMonitoring.inventory.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="Enter type" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="flowMonitoring.inventory.model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input placeholder="Enter model" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="flowMonitoring.inventory.serial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter serial number" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="flowMonitoring.inventory.fmSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flowmeter Size</FormLabel>
              <FormControl>
                <Input placeholder="Enter flowmeter size" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="flowMonitoring.inventory.pipelineSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pipeline Size</FormLabel>
              <FormControl>
                <Input placeholder="Enter pipeline size" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="flowMonitoring.inventory.velocityRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Velocity Range</FormLabel>
              <FormControl>
                <Input placeholder="Enter velocity range" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="flowMonitoring.inventory.accuracyReading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accuracy (Reading)</FormLabel>
              <FormControl>
                <Input placeholder="Enter accuracy for reading" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="flowMonitoring.inventory.accuracyFullScale"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accuracy (Full Scale)</FormLabel>
              <FormControl>
                <Input placeholder="Enter accuracy full scale" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="flowMonitoring.inventory.readingMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reading Method</FormLabel>
              <FormControl>
                <Input placeholder="Enter reading method" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
