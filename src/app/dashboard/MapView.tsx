'use client'

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import L from 'leaflet'

export type FlowMeter = {
  id: string
  name: string
  latitude: number
  longitude: number
  type: string
}

type Props = {
  flowMeters: FlowMeter[]
  onCreateNew?: (lat: number, lng: number) => void
  onDelete?: (id: string) => void
  onEdit?: (flowMeter: FlowMeter) => void
  activeType?: string
  setActiveType?: (type: string) => void
}

function FixLeafletMapSize() {
  const map = useMap()

  useEffect(() => {
    const resize = () => {
      map.invalidateSize()
    }

    // multiple calls to force it
    setTimeout(resize, 100)
    setTimeout(resize, 500)
    setTimeout(resize, 1000)

    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [map])

  return null
}

function AddMarkerOnClick({ onCreateNew }: { onCreateNew?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      onCreateNew?.(lat, lng)
    },
  })
  return null
}

export default function MapView({
  flowMeters,
  onCreateNew,
  onDelete,
  onEdit,
  activeType,
}: Props) {
  const [selected, setSelected] = useState<FlowMeter | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filtered = activeType
    ? flowMeters.filter((m) => m.type === activeType)
    : flowMeters

  return (
    <div className="w-full" style={{ height: '600px' }}>
      {mounted && (
        <MapContainer
          center={[31.95, 35.91]}
          zoom={10}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
        >
          <FixLeafletMapSize />
          <AddMarkerOnClick onCreateNew={onCreateNew} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filtered.map((fm) => (
            <Marker
              key={fm.id}
              position={[fm.latitude, fm.longitude]}
              icon={L.divIcon({
                html: '📍',
                className: 'text-xl cursor-pointer',
                iconSize: [24, 24],
                iconAnchor: [12, 24],
              })}
              eventHandlers={{
                click: () => setSelected(fm),
              }}
            />
          ))}

          {selected && (
            <Popup
              position={[selected.latitude, selected.longitude]}
              eventHandlers={{
                remove: () => setSelected(null),
              }}
            >
              <div>
                <strong>{selected.name}</strong><br />
                Type: {selected.type}
                <div className="mt-2 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      onEdit?.(selected)
                      setSelected(null)
                    }}
                    className="text-sm text-blue-600 underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete?.(selected.id)
                      setSelected(null)
                    }}
                    className="text-sm text-red-600 underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Popup>
          )}
        </MapContainer>
      )}
    </div>
  )
}
