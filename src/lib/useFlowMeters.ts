import { useState } from 'react'
import { FilterState } from '@/components/FlowMeterFilters'
import { mockFlowMeters } from '@/lib/mock'  // Ensure mockFlowMeters is imported from the correct path

export function useFlowMeters() {
  const [filters, setFilters] = useState<FilterState>({})

  // Filter flow meters based on the filter state
  const filtered = mockFlowMeters.filter((fm) => {
    return (
      (!filters.age || fm.age >= filters.age) &&
      (!filters.flow || fm.flow >= filters.flow) &&
      (!filters.diameter || fm.diameter >= filters.diameter) &&
      (!filters.manufacturer ||
        fm.manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase()))
    )
  })

  // Return the filtered flow meters, filter setter function, and the current filters
  return {
    flowMeters: filtered,
    setFilters,
    filters,
  }
}
