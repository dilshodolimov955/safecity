import { useState } from "react"
import { AlertTriangle, MapPin, Clock, Search } from "lucide-react"
import { alerts } from "../data/mock"

type Lang = "uz" | "ru" | "en"

const t = {
  uz: { title: "Ogohlantirishlar", sub: "Barcha aniqlangan hodisalar", search: "Qidirish...", all: "Barchasi", stolen: "O'g'irlangan", wanted: "Qidirilmoqda", escaped: "Qochgan", today: "bugun", detail: "Batafsil", count: "ta bugun" },
  ru: { title: "Оповещения", sub: "Все обнаруженные инциденты", search: "Поиск...", all: "Все", stolen: "Украден", wanted: "В розыске", escaped: "Сбежал", today: "сегодня", detail: "Подробнее", count: "сегодня" },
  en: { title: "Alerts", sub: "All detected incidents", search: "Search...", all: "All", stolen: "Stolen", wanted: "Wanted", escaped: "Escaped", today: "today", detail: "Details", count: "today" },
}

const typeBadge: Record<string, string> = {
  stolen: "badge-red",
  wanted: "badge-amber",
  escaped: "badge-red",
}

const borderColor: Record<string, string> = {
  high: "var(--red)",
  medium: "var(--amber)",
}

export default function Alerts({ lang = "uz" }: { lang?: Lang }) {
  const tr = t[lang]
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const filtered = alerts.filter((a) => {
    const matchSearch = a.plate.toLowerCase().includes(search.toLowerCase()) || a.location.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "all" || a.type === filter
    return matchSearch && matchFilter
  })

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }} className="fade-up">

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: 600, color: "var(--t1)" }}>{tr.title}</h1>
          <p style={{ fontSize: "13px", color: "var(--t2)", marginTop: "4px" }}>{tr.sub}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "9px", padding: "8px 14px" }}>
          <AlertTriangle size={14} color="var(--red)" />
          <span style={{ fontSize: "13px", color: "var(--red)", fontWeight: 600 }}>{alerts.length} {tr.count}</span>
        </div>
      </div>

      {/* Search + Filter */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--t3)" }} />
          <input
            placeholder={tr.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "36px" }}
          />
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {["all", "stolen", "wanted", "escaped"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`btn btn-ghost ${filter === f ? "active" : ""}`}
              style={{ padding: "8px 14px", fontSize: "12px" }}
            >
              {tr[f as keyof typeof tr]}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {filtered.map((a, i) => (
          <div key={a.id} className="card" style={{
            padding: "14px 16px",
            borderLeft: `3px solid ${borderColor[a.status]}`,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            animation: `fadeUp .4s ease ${i * 0.05}s forwards`,
            opacity: 0,
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--hover)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--card)")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: borderColor[a.status],
                boxShadow: `0 0 8px ${borderColor[a.status]}`,
              }} className="pulse" />
              <div>
                <p style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "15px", color: "var(--t1)", letterSpacing: "1px" }}>{a.plate}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--t2)" }}>
                    <MapPin size={11} /> {a.location}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--t2)" }}>
                    <Clock size={11} /> {a.time}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className={`badge ${typeBadge[a.type]}`}>{tr[a.type as keyof typeof tr]}</span>
              <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: "11px" }}>{tr.detail} →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}