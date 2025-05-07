'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect } from 'react'
import L from 'leaflet'
import { FlowMeter } from '@/types'

interface Props {
  flowMeters: FlowMeter[]
}

export default function FlowMeterMap({ flowMeters }: Props) {
  // Set custom Leaflet marker icons on mount
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    })
  }, [])

  return (
    <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
    <MapContainer
      center={[31.95, 35.9]}
      zoom={8}
      scrollWheelZoom
      className="h-full w-full z-0 leaflet-container" // ✅ make sure this is here
    >
        <TileLayer
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {flowMeters.length === 0 ? null : flowMeters.map((fm) => (
          <Marker key={fm.id} position={[fm.lat, fm.lng]}>
            <Popup>
              <div className="space-y-1 text-sm">
                <strong>{fm.name}</strong><br />
                Age: {fm.age} yrs<br />
                Flow: {fm.flow} m³/h<br />
                Diameter: {fm.diameter} mm<br />
                Manufacturer: {fm.manufacturer}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}