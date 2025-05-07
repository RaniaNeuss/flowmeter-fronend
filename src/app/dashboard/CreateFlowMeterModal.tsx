'use client'

import { useState } from 'react'

export default function CreateFlowMeterModal({
  location,
  onClose,
  onCreated,
  defaultName = '',
  defaultType = ''
}: {
  location: { lat: number, lng: number }
  onClose: () => void
  onCreated: (data: { name: string; type: string }) => void
  defaultName?: string
  defaultType?: string
}) {
  const [name, setName] = useState(defaultName)
  const [type, setType] = useState(defaultType)

  const handleSubmit = () => {
    if (!name || !type) return
    onCreated({ name, type })
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-[400px]">
        <h2 className="text-xl mb-4">{defaultName ? 'Edit Flow Meter' : 'Add Flow Meter'}</h2>
        <p className="text-sm mb-4">Lat: {location.lat.toFixed(5)}, Lng: {location.lng.toFixed(5)}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border mb-2"
        />
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Type"
          className="w-full p-2 border mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  )
}
