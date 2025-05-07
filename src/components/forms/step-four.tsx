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
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function StepFour() {
  const { control } = useFormContext<RfpFormData>();

  return (
    <div className="rounded-xl border bg-muted/50 p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">FM location details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location Type */}
        {/* <FormField
          control={control}
          name="locationType.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="select-trigger">
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* Location Description */}
        <FormField
          control={control}
          name="location.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Description</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Main inlet chamber" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Region */}
        <FormField
          control={control}
          name="location.region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Input placeholder="Enter region" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* STPCC */}
        <FormField
          control={control}
          name="location.stpcc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>STPCC</FormLabel>
              <FormControl>
                <Input placeholder="Enter STPCC" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Coordinate N */}
        <FormField
          control={control}
          name="location.coordinateN"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coordinate N (North)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Coordinate E */}
        <FormField
          control={control}
          name="location.coordinateE"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coordinate E (East)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Site Drawing Reference */}
        <FormField
          control={control}
          name="location.siteDrawingRef"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Drawing Reference</FormLabel>
              <FormControl>
                <Input placeholder="Enter site drawing reference" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      </div>
    </div>
  );
}




/////////////////////////////////////////////////////////////////

// 'use client';

// import { useFormContext } from 'react-hook-form';
// import { Input } from '@/components/ui/input';
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from '@/components/ui/form';
// import { RfpFormData } from '../../../schema/rfp-schema';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// export function StepFour() {
//   const { control } = useFormContext<RfpFormData>();

//   return (
//     <div className="rounded-xl border bg-muted/50 p-6 shadow-sm space-y-6">
//       <h2 className="text-lg font-semibold">Location & Flow Info</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <FormField
//   control={control}
//   name="locationType.type"
//   render={({ field }) => (
//     <FormItem>
//       <FormLabel>Location Type</FormLabel>
//       <FormControl>
//         <Select onValueChange={field.onChange} value={field.value}>
//           <SelectTrigger>
//             <SelectValue placeholder="Select location type" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="Industrial">Industrial</SelectItem>
//             <SelectItem value="Residential">Residential</SelectItem>
//             <SelectItem value="Commercial">Commercial</SelectItem>
//             <SelectItem value="Other">Other</SelectItem>
//           </SelectContent>
//         </Select>
//       </FormControl>
//       <FormMessage />
//     </FormItem>
//   )}
// />

//         <FormField
//           control={control}
//           name="location.description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Location Description</FormLabel>
//               <FormControl>
//                 <Input placeholder="e.g. Main inlet chamber" {...field} value={field.value ?? ''} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={control}
//           name="flowMeasurement.cumulativeFlow"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Cumulative Flow</FormLabel>
//               <FormControl>
//                 <input type="checkbox" checked={field.value} onChange={field.onChange} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={control}
//           name="flowMeasurement.fifteenMinFlow"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>15 Min Flow</FormLabel>
//               <FormControl>
//                 <input type="checkbox" checked={field.value} onChange={field.onChange} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={control}
//           name="flowMeasurement.eventRecording"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Event Recording</FormLabel>
//               <FormControl>
//                 <input type="checkbox" checked={field.value} onChange={field.onChange} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={control}
//           name="flowMonitoring.installation.meterInstallDate"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Meter Install Date</FormLabel>
//               <FormControl>
//                 <Input
//                   type="date"
//                   value={field.value ? String(field.value).split('T')[0] : ''}
//                   onChange={(e) => field.onChange(e.target.value)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={control}
//           name="flowMonitoring.installation.meterRemovalDate"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Meter Removal Date</FormLabel>
//               <FormControl>
//                 <Input
//                   type="date"
//                   value={field.value ? String(field.value).split('T')[0] : ''}
//                   onChange={(e) => field.onChange(e.target.value)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//     </div>
//   );
// }
