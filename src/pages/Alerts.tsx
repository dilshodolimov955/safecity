import { AlertTriangle, MapPin, Clock } from "lucide-react"
import { alerts, cameras, weeklyStats } from "../data/mock"

const typeLabel: Record<string, string> = {
  stolen: "O'g'irlangan",
  wanted: "Qidirilmoqda",
  escaped: "Qochgan",
}

const typeBadge: Record<string, string> = {
  stolen: "bg-red-50 text-red-600",
  wanted: "bg-amber-50 text-amber-600",
  escaped: "bg-red-50 text-red-700",
}

const statusBorder: Record<string, string> = {
  high: "border-l-4 border-l-red-400",
  medium: "border-l-4 border-l-amber-400",
}

export default function Alerts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-900">Ogohlantirishlar</h1>
          <p className="text-sm text-gray-400">Barcha aniqlangan hodisalar</p>
        </div>
        <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm px-3 py-1.5 rounded-lg">
          <AlertTriangle size={14} />
          <span>{alerts.length} ta bugun</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {["Barchasi", "O'g'irlangan", "Qidirilmoqda", "Qochgan"].map((f) => (
          <button
            key={f}
            className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 first:bg-blue-50 first:text-blue-600 first:border-blue-200"
          >
            {f}
          </button>
        ))}
      </div>

      {/* Alerts list */}
      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a.id}
            className={`bg-white rounded-xl border border-gray-100 p-4 ${statusBorder[a.status]}`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium text-gray-900 text-base">{a.plate}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${typeBadge[a.type]}`}>
                    {typeLabel[a.type]}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin size={12} />
                  <span>{a.location}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={12} />
                  <span>{a.time} — bugun</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className={`w-2 h-2 rounded-full ${a.status === "high" ? "bg-red-500" : "bg-amber-400"}`} />
                <button className="text-xs text-blue-500 hover:text-blue-700">Batafsil →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}