'use client'

import dynamic from 'next/dynamic'
import { FlowMeter } from '@/types'

// Dynamically import the real Leaflet map without SSR
const Map = dynamic(() => import('./FlowMeterMap'), { ssr: false })

interface Props {
    flowMeters: FlowMeter[]
}

export default function FlowMeterMapWrapper({ flowMeters }: Props) {
  return <Map flowMeters={flowMeters} />
}
