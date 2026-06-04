import { useState } from "react"
import { MapPin, AlertTriangle, Shield, Minus } from "lucide-react"

const zones = [
  { id: 1, name: "Chorsu", risk: "high", x: 25, y: 30, incidents: 12 },
  { id: 2, name: "Chilonzor", risk: "medium", x: 55, y: 55, incidents: 6 },
  { id: 3, name: "Yunusobod", risk: "medium", x: 68, y: 20, incidents: 5 },
  { id: 4, name: "Yakkasaroy", risk: "low", x: 78, y: 58, incidents: 2 },
  { id: 5, name: "Sergeli", risk: "low", x: 40, y: 70, incidents: 3 },
  { id: 6, name: "Mirzo Ulugbek", risk: "high", x: 70, y: 40, incidents: 9 },
  { id: 7, name: "Shayxontohur", risk: "medium", x: 35, y: 45, incidents: 7 },
]

const riskConfig = {
  high: { color: "#ef4444", bg: "bg-red-50", text: "text-red-600", label: "Yuqori xavf", size: 70 },
  medium: { color: "#f59e0b", bg: "bg-amber-50", text: "text-amber-600", label: "O'rtacha", size: 55 },
  low: { color: "#22c55e", bg: "bg-green-50", text: "text-green-600", label: "Xavfsiz", size: 45 },
}

export default function Map() {
  const [selected, setSelected] = useState<typeof zones[0] | null>(null)
  const [filter, setFilter] = useState("all")

  const filtered = zones.filter((z) => filter === "all" || z.risk === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-900">Xavfsizlik xaritasi</h1>
          <p className="text-sm text-gray-400">Toshkent shahri — real vaqt</p>
        </div>
        <div className="flex gap-2">
          {[
            { key: "all", label: "Barchasi" },
            { key: "high", label: "Xavfli" },
            { key: "medium", label: "O'rtacha" },
            { key: "low", label: "Xavfsiz" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                filter === f.key
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Map */}
        <div className="col-span-2 bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-800">Toshkent xaritasi</p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>Xavfli</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>O'rtacha</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>Xavfsiz</span>
            </div>
          </div>
          <div
            className="relative bg-blue-50"
            style={{ height: 380 }}
          >
            {/* Grid lines */}
            {[20, 40, 60, 80].map((p) => (
              <div key={p}>
                <div className="absolute top-0 bottom-0 border-l border-blue-100" style={{ left: `${p}%` }} />
                <div className="absolute left-0 right-0 border-t border-blue-100" style={{ top: `${p}%` }} />
              </div>
            ))}

            {/* Zones */}
            {filtered.map((zone) => {
              const config = riskConfig[zone.risk as keyof typeof riskConfig]
              return (
                <div
                  key={zone.id}
                  className="absolute cursor-pointer transition-transform hover:scale-110"
                  style={{
                    left: `${zone.x}%`,
                    top: `${zone.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => setSelected(zone)}
                >
                  <div
                    className="rounded-full opacity-30"
                    style={{
                      width: config.size,
                      height: config.size,
                      background: config.color,
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                  <div className="relative flex flex-col items-center">
                    <MapPin
                      size={20}
                      fill={config.color}
                      color={config.color}
                    />
                    <span className="text-xs font-medium text-gray-700 bg-white px-1.5 py-0.5 rounded shadow-sm mt-0.5 whitespace-nowrap">
                      {zone.name}
                    </span>
                  </div>
                </div>
              )
            })}

            {/* Selected popup */}
            {selected && (
              <div
                className="absolute bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-10 w-44"
                style={{
                  left: `${Math.min(selected.x + 5, 65)}%`,
                  top: `${Math.min(selected.y - 10, 70)}%`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">{selected.name}</p>
                  <button onClick={() => setSelected(null)} className="text-gray-300 hover:text-gray-500">
                    <Minus size={13} />
                  </button>
                </div>
                <div className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mb-2 ${riskConfig[selected.risk as keyof typeof riskConfig].bg} ${riskConfig[selected.risk as keyof typeof riskConfig].text}`}>
                  <AlertTriangle size={10} />
                  {riskConfig[selected.risk as keyof typeof riskConfig].label}
                </div>
                <p className="text-xs text-gray-500">
                  Bugun: <span className="font-medium text-gray-800">{selected.incidents} ta hodisa</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Zone list */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-800">Hududlar holati</p>
          </div>
          <div className="divide-y divide-gray-50">
            {zones.map((zone) => {
              const config = riskConfig[zone.risk as keyof typeof riskConfig]
              return (
                <div
                  key={zone.id}
                  className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelected(zone)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: config.color }} />
                    <span className="text-sm text-gray-700">{zone.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{zone.incidents} hodisa</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
                      {config.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Shield size={12} />
              <span>Jami: {zones.reduce((a, b) => a + b.incidents, 0)} ta hodisa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}