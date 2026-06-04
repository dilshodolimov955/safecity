import { useState } from "react"
import { Camera, Wifi, WifiOff, MapPin, Search } from "lucide-react"
import { alerts, cameras, weeklyStats } from "../data/mock"

export default function Cameras() {
  const [search, setSearch] = useState("")

  const filtered = cameras.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.zone.toLowerCase().includes(search.toLowerCase())
  )

  const online = cameras.filter((c) => c.status === "online").length
  const offline = cameras.filter((c) => c.status === "offline").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-900">Kameralar</h1>
          <p className="text-sm text-gray-400">Barcha kameralar holati</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 bg-green-50 text-green-600 text-sm px-3 py-1.5 rounded-lg">
            <Wifi size={13} />
            <span>{online} online</span>
          </div>
          <div className="flex items-center gap-1.5 bg-red-50 text-red-500 text-sm px-3 py-1.5 rounded-lg">
            <WifiOff size={13} />
            <span>{offline} offline</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Kamera nomi yoki zona..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-white border border-gray-100 rounded-xl p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <Camera size={17} className="text-blue-500" />
              </div>
              <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${
                c.status === "online"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-500"
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  c.status === "online" ? "bg-green-500" : "bg-red-400"
                }`} />
                {c.status === "online" ? "Online" : "Offline"}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">{c.name}</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                <MapPin size={11} />
                <span>{c.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <span className="text-xs text-gray-400">Zona</span>
              <span className="text-xs font-medium text-gray-700">{c.zone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}