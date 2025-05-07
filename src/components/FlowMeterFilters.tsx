'use client'

import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface FilterProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  age?: number
  flow?: number
  diameter?: number
  manufacturer?: string
}

export default function FlowMeterFilters({ onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({})

  const handleChange = (key: keyof FilterState, value: string) => {
    let parsed: string | number | undefined = value

    if (key !== 'manufacturer') {
      const num = parseFloat(value)
      parsed = isNaN(num) ? undefined : num
    } else {
      parsed = value.trim() || undefined
    }

    const updated = { ...filters, [key]: parsed }
    setFilters(updated)
    onFilterChange(updated)
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <Input
        type="number"
        placeholder="Min Age"
        onChange={(e) => handleChange('age', e.target.value)}
      />
      <Input
        type="number"
        placeholder="Min Flow"
        onChange={(e) => handleChange('flow', e.target.value)}
      />
      <Input
        type="number"
        placeholder="Min Diameter"
        onChange={(e) => handleChange('diameter', e.target.value)}
      />
      <Input
        placeholder="Manufacturer"
        onChange={(e) => handleChange('manufacturer', e.target.value)}
      />
    </div>
  )
}
