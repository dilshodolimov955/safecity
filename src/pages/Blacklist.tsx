import { useState } from "react"
import { Search, Plus, Trash2 } from "lucide-react"
import { vehicles } from "../data/mock"
import type { Vehicle } from "../types/index"

const typeLabel: Record<Vehicle["type"], string> = {
  stolen: "O'g'irlangan",
  wanted: "Qidirilmoqda",
  escaped: "Qochgan",
}

const typeBadge: Record<Vehicle["type"], string> = {
  stolen: "bg-red-50 text-red-600",
  wanted: "bg-amber-50 text-amber-600",
  escaped: "bg-red-50 text-red-700",
}

export default function Blacklist() {
  const [search, setSearch] = useState("")
  const [list, setList] = useState<Vehicle[]>(vehicles)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    plate: "",
    owner: "",
    reason: "",
    type: "stolen" as Vehicle["type"],
  })

  const filtered = list.filter(
    (v) =>
      v.plate.toLowerCase().includes(search.toLowerCase()) ||
      v.owner.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = () => {
    if (!form.plate || !form.owner) return

    const newVehicle: Vehicle = {
      id: Date.now(),
      plate: form.plate.toUpperCase(),
      owner: form.owner,
      reason: form.reason,
      addedDate: new Date().toISOString().split("T")[0],
      type: form.type,
    }

    setList([newVehicle, ...list])
    setForm({ plate: "", owner: "", reason: "", type: "stolen" })
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setList(list.filter((v) => v.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-900">Qora ro'yxat</h1>
          <p className="text-sm text-gray-400">{list.length} ta avtomobil</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={15} />
          Qo'shish
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white border rounded-xl p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Raqam"
              value={form.plate}
              onChange={(e) => setForm({ ...form, plate: e.target.value })}
              className="border rounded-lg px-3 py-2 text-sm"
            />
            <input
              placeholder="Egasi"
              value={form.owner}
              onChange={(e) => setForm({ ...form, owner: e.target.value })}
              className="border rounded-lg px-3 py-2 text-sm"
            />
            <input
              placeholder="Sabab"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="border rounded-lg px-3 py-2 text-sm"
            />
            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as Vehicle["type"] })
              }
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="stolen">O'g'irlangan</option>
              <option value="wanted">Qidirilmoqda</option>
              <option value="escaped">Qochgan</option>
            </select>
          </div>

          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg"
          >
            Saqlash
          </button>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-4 py-3">Raqam</th>
              <th className="text-left px-4 py-3">Egasi</th>
              <th className="text-left px-4 py-3">Sabab</th>
              <th className="text-left px-4 py-3">Tur</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((v) => (
              <tr key={v.id} className="border-t">
                <td className="px-4 py-3 font-mono">{v.plate}</td>
                <td className="px-4 py-3">{v.owner}</td>
                <td className="px-4 py-3">{v.reason}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded ${typeBadge[v.type]}`}>
                    {typeLabel[v.type]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(v.id)}>
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}