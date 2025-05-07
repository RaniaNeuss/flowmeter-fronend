'use client'

import MapView, { FlowMeter } from '@/../src/app/dashboard/MapView'
import CreateFlowMeterModal from '@/../src/app/dashboard/CreateFlowMeterModal'
import { useEffect, useState } from 'react'

export default function DashboardMapPage() {
  const [flowMeters, setFlowMeters] = useState<FlowMeter[]>([])
  const [typeFilter, setTypeFilter] = useState<string | undefined>()
  const [showModal, setShowModal] = useState(false)
  const [newLocation, setNewLocation] = useState<{ lat: number, lng: number } | null>(null)
  const [editing, setEditing] = useState<FlowMeter | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('flowMeters')
    if (stored) setFlowMeters(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('flowMeters', JSON.stringify(flowMeters))
  }, [flowMeters])

  const handleMapClick = (lat: number, lng: number) => {
    setNewLocation({ lat, lng })
    setShowModal(true)
  }

  const handleNewFlowMeter = (data: { name: string; type: string; latitude: number; longitude: number }) => {
    if (editing) {
      setFlowMeters(prev => prev.map(m => m.id === editing.id ? { ...m, ...data } : m))
      setEditing(null)
    } else {
      setFlowMeters(prev => [...prev, { id: crypto.randomUUID(), ...data }])
    }
  }

  const handleDelete = (id: string) => {
    setFlowMeters(prev => prev.filter(m => m.id !== id))
  }

  const handleEdit = (fm: FlowMeter) => {
    setEditing(fm)
    setNewLocation({ lat: fm.latitude, lng: fm.longitude })
    setShowModal(true)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Flow Meter Map</h1>

      <div className="mb-4">
        <select
          className="p-2 border rounded"
          value={typeFilter ?? ''}
          onChange={(e) => setTypeFilter(e.target.value || undefined)}
        >
          <option value="">All types</option>
          <option value="urban">Urban</option>
          <option value="industrial">Industrial</option>
        </select>
      </div>

      <MapView
        flowMeters={flowMeters}
        onCreateNew={handleMapClick}
        onDelete={handleDelete}
        onEdit={handleEdit}
        activeType={typeFilter}
        setActiveType={setTypeFilter}
      />

      {showModal && newLocation && (
        <CreateFlowMeterModal
          location={newLocation}
          onClose={() => {
            setShowModal(false)
            setEditing(null)
          }}
          onCreated={(data) => {
            handleNewFlowMeter({
              name: data.name,
              type: data.type,
              latitude: newLocation.lat,
              longitude: newLocation.lng,
            })
                        setShowModal(false)
          }}
          defaultName={editing?.name}
          defaultType={editing?.type}
        />
      )}
    </div>
  )
}
