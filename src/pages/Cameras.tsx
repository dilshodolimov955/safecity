import { useState } from "react"
import { Search, Wifi, WifiOff, MapPin, Camera } from "lucide-react"
import { cameras } from "../data/mock"

type Lang = "uz" | "ru" | "en"

const t = {
  uz: { title: "Kameralar", sub: "Barcha kameralar holati", search: "Kamera nomi...", online: "Online", offline: "Offline", zone: "Zona", location: "Joylashuv", status: "Holat", all: "Barchasi" },
  ru: { title: "Камеры", sub: "Статус всех камер", search: "Имя камеры...", online: "Online", offline: "Offline", zone: "Зона", location: "Расположение", status: "Статус", all: "Все" },
  en: { title: "Cameras", sub: "All cameras status", search: "Camera name...", online: "Online", offline: "Offline", zone: "Zone", location: "Location", status: "Status", all: "All" },
}

export default function Cameras({ lang = "uz" }: { lang?: Lang }) {
  const tr = t[lang]
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const filtered = cameras.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.zone.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "all" || c.status === filter
    return matchSearch && matchFilter
  })

  const onlineCount = cameras.filter((c) => c.status === "online").length
  const offlineCount = cameras.filter((c) => c.status === "offline").length

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }} className="fade-up">

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: 600, color: "var(--t1)" }}>{tr.title}</h1>
          <p style={{ fontSize: "13px", color: "var(--t2)", marginTop: "4px" }}>{tr.sub}</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "9px", padding: "7px 12px" }}>
            <Wifi size={13} color="var(--green)" />
            <span style={{ fontSize: "13px", color: "var(--green)", fontWeight: 600 }}>{onlineCount} {tr.online}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "9px", padding: "7px 12px" }}>
            <WifiOff size={13} color="var(--red)" />
            <span style={{ fontSize: "13px", color: "var(--red)", fontWeight: 600 }}>{offlineCount} {tr.offline}</span>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--t3)" }} />
          <input placeholder={tr.search} value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: "36px" }} />
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {["all", "online", "offline"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`btn btn-ghost ${filter === f ? "active" : ""}`}
              style={{ padding: "8px 14px", fontSize: "12px" }}
            >
              {tr[f as keyof typeof tr]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
        {filtered.map((c, i) => (
          <div key={c.id} className="card" style={{
            padding: "18px",
            animation: `fadeUp .4s ease ${i * 0.06}s forwards`,
            opacity: 0,
            cursor: "pointer",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--hover)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--card)")}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px" }}>
              <div style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: c.status === "online" ? "rgba(16,185,129,0.1)" : "rgba(248,113,113,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Camera size={17} color={c.status === "online" ? "var(--green)" : "var(--red)"} />
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: "5px",
                background: c.status === "online" ? "rgba(16,185,129,0.1)" : "rgba(248,113,113,0.1)",
                border: `1px solid ${c.status === "online" ? "rgba(16,185,129,0.2)" : "rgba(248,113,113,0.2)"}`,
                borderRadius: "20px", padding: "3px 10px",
              }}>
                <div style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: c.status === "online" ? "var(--green)" : "var(--red)",
                }} className={c.status === "online" ? "pulse" : ""} />
                <span style={{ fontSize: "11px", fontWeight: 600, color: c.status === "online" ? "var(--green2)" : "var(--red)" }}>
                  {c.status === "online" ? tr.online : tr.offline}
                </span>
              </div>
            </div>

            <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--t1)", marginBottom: "6px" }}>{c.name}</p>

            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "12px" }}>
              <MapPin size={11} color="var(--t2)" />
              <span style={{ fontSize: "12px", color: "var(--t2)" }}>{c.location}</span>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", color: "var(--t3)" }}>{tr.zone}</span>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--blue2)" }}>{c.zone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}