import { useState } from 'react'
import { mockFlowMeters } from '../lib/mock'
import { FilterState } from '@/components/FlowMeterFilters'
import { FlowMeter } from '@/types'
export function useFlowMeters() {
  const [filters, setFilters] = useState<FilterState>({})

  const flowMeters: FlowMeter[] = mockFlowMeters.filter((fm) => {
    return (
      (!filters.age || fm.age >= Number(filters.age)) &&
      (!filters.flow || fm.flow >= Number(filters.flow)) &&
      (!filters.diameter || fm.diameter >= Number(filters.diameter)) &&
      (!filters.manufacturer || fm.manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase()))
    )
  })
  

  return {
    flowMeters,
    setFilters
  }
}
