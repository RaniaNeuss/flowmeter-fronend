// lib/mock.ts
import { FlowMeter } from '@/types'

export const mockFlowMeters: FlowMeter[] = [
  {
    id: '1',
    name: 'Meter A',
    age: 3,
    flow: 12.5,
    diameter: 100,
    manufacturer: 'Neuss',
    lat: 31.963158,
    lng: 35.930359,
  },
  {
    id: '2',
    name: 'Meter B',
    age: 7,
    flow: 30.2,
    diameter: 80,
    manufacturer: 'OtherCo',
    lat: 32.0,
    lng: 35.8,
  },
]
