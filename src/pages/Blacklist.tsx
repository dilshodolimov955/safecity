import { useState } from "react"
import { Search, Plus, Trash2, X } from "lucide-react"
import { vehicles } from "../data/mock"
import type { Vehicle } from "../types"

type Lang = "uz" | "ru" | "en"

const t = {
  uz: { title: "Qora ro'yxat", sub: "avtomobil", search: "Raqam yoki ism...", add: "Qo'shish", save: "Saqlash", cancel: "Bekor", plate: "Raqam", owner: "Egasi", reason: "Sabab", type: "Tur", date: "Sana", stolen: "O'g'irlangan", wanted: "Qidirilmoqda", escaped: "Qochgan" },
  ru: { title: "Чёрный список", sub: "автомобилей", search: "Номер или имя...", add: "Добавить", save: "Сохранить", cancel: "Отмена", plate: "Номер", owner: "Владелец", reason: "Причина", type: "Тип", date: "Дата", stolen: "Украден", wanted: "В розыске", escaped: "Сбежал" },
  en: { title: "Blacklist", sub: "vehicles", search: "Plate or name...", add: "Add", save: "Save", cancel: "Cancel", plate: "Plate", owner: "Owner", reason: "Reason", type: "Type", date: "Date", stolen: "Stolen", wanted: "Wanted", escaped: "Escaped" },
}

const typeBadge: Record<string, string> = {
  stolen: "badge-red",
  wanted: "badge-amber",
  escaped: "badge-red",
}

export default function Blacklist({ lang = "uz" }: { lang?: Lang }) {
  const tr = t[lang]
  const [list, setList] = useState<Vehicle[]>(vehicles)
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ plate: "", owner: "", reason: "", type: "stolen" })

  const filtered = list.filter(
    (v) => v.plate.toLowerCase().includes(search.toLowerCase()) || v.owner.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = () => {
    if (!form.plate || !form.owner) return
    setList([{ id: Date.now(), plate: form.plate.toUpperCase(), owner: form.owner, reason: form.reason, addedDate: new Date().toISOString().split("T")[0], type: form.type as Vehicle["type"] }, ...list])
    setForm({ plate: "", owner: "", reason: "", type: "stolen" })
    setShowForm(false)
  }

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }} className="fade-up">

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: 600, color: "var(--t1)" }}>{tr.title}</h1>
          <p style={{ fontSize: "13px", color: "var(--t2)", marginTop: "4px" }}>{list.length} {tr.sub}</p>
        </div>
        <button className="btn btn-blue" onClick={() => setShowForm(!showForm)}>
          <Plus size={15} /> {tr.add}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card fade-in" style={{ padding: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--t1)" }}>{tr.add}</p>
            <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", color: "var(--t2)", cursor: "pointer" }}><X size={16} /></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
            <input placeholder={tr.plate} value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value })} />
            <input placeholder={tr.owner} value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} />
            <input placeholder={tr.reason} value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="stolen">{tr.stolen}</option>
              <option value="wanted">{tr.wanted}</option>
              <option value="escaped">{tr.escaped}</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="btn btn-blue" onClick={handleAdd}>{tr.save}</button>
            <button className="btn btn-ghost" onClick={() => setShowForm(false)}>{tr.cancel}</button>
          </div>
        </div>
      )}

      {/* Search */}
      <div style={{ position: "relative" }}>
        <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--t3)" }} />
        <input placeholder={tr.search} value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: "36px" }} />
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: "hidden" }}>
        <table>
          <thead>
            <tr>
              <th>{tr.plate}</th>
              <th>{tr.owner}</th>
              <th>{tr.reason}</th>
              <th>{tr.type}</th>
              <th>{tr.date}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, i) => (
              <tr key={v.id} style={{ animation: `fadeUp .3s ease ${i * 0.04}s forwards`, opacity: 0 }}>
                <td><span style={{ fontFamily: "monospace", fontWeight: 700, letterSpacing: "1px", color: "var(--t1)" }}>{v.plate}</span></td>
                <td style={{ color: "var(--t1)" }}>{v.owner}</td>
                <td style={{ color: "var(--t2)" }}>{v.reason}</td>
                <td><span className={`badge ${typeBadge[v.type]}`}>{tr[v.type as keyof typeof tr]}</span></td>
                <td style={{ color: "var(--t2)", fontSize: "12px" }}>{v.addedDate}</td>
                <td>
                  <button onClick={() => setList(list.filter((x) => x.id !== v.id))}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--t3)", transition: "color .2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--red)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--t3)")}
                  ><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}