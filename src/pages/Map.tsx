import { useState } from "react"
import { MapPin, AlertTriangle, Shield, X } from "lucide-react"

type Lang = "uz" | "ru" | "en"

const t = {
  uz: { title: "Xavfsizlik xaritasi", sub: "Toshkent shahri — real vaqt", all: "Barchasi", high: "Xavfli", medium: "O'rtacha", low: "Xavfsiz", zones: "Hududlar holati", incidents: "hodisa", total: "Jami", highRisk: "Yuqori xavf", medRisk: "O'rtacha", lowRisk: "Xavfsiz" },
  ru: { title: "Карта безопасности", sub: "Город Ташкент — реальное время", all: "Все", high: "Опасно", medium: "Средний", low: "Безопасно", zones: "Статус районов", incidents: "инцидент", total: "Всего", highRisk: "Высокий риск", medRisk: "Средний", lowRisk: "Безопасно" },
  en: { title: "Safety map", sub: "Tashkent city — real time", all: "All", high: "Dangerous", medium: "Medium", low: "Safe", zones: "Zone status", incidents: "incidents", total: "Total", highRisk: "High risk", medRisk: "Medium", lowRisk: "Safe" },
}

const zones = [
  { id: 1, name: "Chorsu", risk: "high", x: 25, y: 28, incidents: 12 },
  { id: 2, name: "Chilonzor", risk: "medium", x: 52, y: 58, incidents: 6 },
  { id: 3, name: "Yunusobod", risk: "medium", x: 68, y: 20, incidents: 5 },
  { id: 4, name: "Yakkasaroy", risk: "low", x: 76, y: 60, incidents: 2 },
  { id: 5, name: "Sergeli", risk: "low", x: 38, y: 72, incidents: 3 },
  { id: 6, name: "Mirzo Ulugbek", risk: "high", x: 72, y: 38, incidents: 9 },
  { id: 7, name: "Shayxontohur", risk: "medium", x: 34, y: 44, incidents: 7 },
  { id: 8, name: "Olmazor", risk: "low", x: 15, y: 55, incidents: 2 },
]

const riskConfig = {
  high: { color: "#f87171", glow: "rgba(248,113,113,0.3)", size: 72, label: "highRisk" },
  medium: { color: "#fbbf24", glow: "rgba(251,191,36,0.3)", size: 56, label: "medRisk" },
  low: { color: "#10b981", glow: "rgba(16,185,129,0.3)", size: 44, label: "lowRisk" },
}

export default function Map({ lang = "uz" }: { lang?: Lang }) {
  const tr = t[lang]
  const [selected, setSelected] = useState<typeof zones[0] | null>(null)
  const [filter, setFilter] = useState("all")

  const filtered = zones.filter((z) => filter === "all" || z.risk === filter)
  const total = zones.reduce((a, b) => a + b.incidents, 0)

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }} className="fade-up">

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: 600, color: "var(--t1)" }}>{tr.title}</h1>
          <p style={{ fontSize: "13px", color: "var(--t2)", marginTop: "4px" }}>{tr.sub}</p>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {["all", "high", "medium", "low"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`btn btn-ghost ${filter === f ? "active" : ""}`}
              style={{ padding: "8px 14px", fontSize: "12px" }}
            >
              {tr[f as keyof typeof tr]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "14px" }}>

        {/* Map */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--t1)" }}>Toshkent</p>
            <div style={{ display: "flex", gap: "14px" }}>
              {["high", "medium", "low"].map((r) => (
                <div key={r} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: riskConfig[r as keyof typeof riskConfig].color }} />
                  <span style={{ fontSize: "11px", color: "var(--t2)" }}>{tr[r as keyof typeof tr]}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", height: "420px", background: "var(--bg)", overflow: "hidden" }}>
            {/* Grid */}
            {[20, 40, 60, 80].map((p) => (
              <div key={p}>
                <div style={{ position: "absolute", top: 0, bottom: 0, left: `${p}%`, borderLeft: "1px solid var(--border)", opacity: 0.4 }} />
                <div style={{ position: "absolute", left: 0, right: 0, top: `${p}%`, borderTop: "1px solid var(--border)", opacity: 0.4 }} />
              </div>
            ))}

            {/* Zones */}
            {filtered.map((zone) => {
              const cfg = riskConfig[zone.risk as keyof typeof riskConfig]
              return (
                <div key={zone.id}
                  style={{ position: "absolute", left: `${zone.x}%`, top: `${zone.y}%`, transform: "translate(-50%,-50%)", cursor: "pointer", zIndex: selected?.id === zone.id ? 10 : 1 }}
                  onClick={() => setSelected(selected?.id === zone.id ? null : zone)}
                >
                  {/* Glow circle */}
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: cfg.size, height: cfg.size,
                    borderRadius: "50%",
                    background: cfg.glow,
                    transition: "all .3s",
                  }} />
                  {/* Pin */}
                  <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <MapPin size={22} fill={cfg.color} color={cfg.color} style={{ filter: `drop-shadow(0 0 6px ${cfg.color})` }} />
                    <div style={{
                      background: "var(--card)", border: `1px solid ${cfg.color}33`,
                      borderRadius: "6px", padding: "2px 7px", marginTop: "2px",
                      fontSize: "10px", fontWeight: 600, color: cfg.color,
                      whiteSpace: "nowrap",
                    }}>
                      {zone.name}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Popup */}
            {selected && (() => {
              const cfg = riskConfig[selected.risk as keyof typeof riskConfig]
              return (
                <div style={{
                  position: "absolute",
                  left: `${Math.min(selected.x + 6, 58)}%`,
                  top: `${Math.max(selected.y - 18, 5)}%`,
                  background: "var(--card)",
                  border: `1px solid ${cfg.color}44`,
                  borderRadius: "12px",
                  padding: "14px",
                  width: "170px",
                  zIndex: 20,
                  boxShadow: `0 4px 24px ${cfg.glow}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--t1)" }}>{selected.name}</p>
                    <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--t2)" }}><X size={14} /></button>
                  </div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    background: `${cfg.color}18`, border: `1px solid ${cfg.color}33`,
                    borderRadius: "20px", padding: "3px 10px", marginBottom: "10px",
                  }}>
                    <AlertTriangle size={10} color={cfg.color} />
                    <span style={{ fontSize: "11px", fontWeight: 600, color: cfg.color }}>
                      {tr[cfg.label as keyof typeof tr]}
                    </span>
                  </div>
                  <p style={{ fontSize: "12px", color: "var(--t2)" }}>
                    {tr.total}: <span style={{ fontWeight: 700, color: "var(--t1)" }}>{selected.incidents}</span> {tr.incidents}
                  </p>
                </div>
              )
            })()}
          </div>
        </div>

        {/* Zone list */}
        <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--t1)" }}>{tr.zones}</p>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {zones.map((zone, i) => {
              const cfg = riskConfig[zone.risk as keyof typeof riskConfig]
              return (
                <div key={zone.id}
                  onClick={() => setSelected(zone)}
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    cursor: "pointer",
                    background: selected?.id === zone.id ? "var(--hover)" : "transparent",
                    transition: "background .15s",
                    animation: `fadeUp .3s ease ${i * 0.04}s forwards`,
                    opacity: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--hover)")}
                  onMouseLeave={e => (e.currentTarget.style.background = selected?.id === zone.id ? "var(--hover)" : "transparent")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }} />
                    <span style={{ fontSize: "13px", color: "var(--t1)" }}>{zone.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "11px", color: "var(--t2)" }}>{zone.incidents}</span>
                    <span style={{
                      fontSize: "10px", padding: "2px 8px", borderRadius: "20px", fontWeight: 600,
                      background: `${cfg.color}18`, color: cfg.color, border: `1px solid ${cfg.color}33`,
                    }}>
                      {tr[cfg.label as keyof typeof tr]}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "8px" }}>
            <Shield size={14} color="var(--blue2)" />
            <span style={{ fontSize: "12px", color: "var(--t2)" }}>{tr.total}: <span style={{ fontWeight: 700, color: "var(--t1)" }}>{total}</span> {tr.incidents}</span>
          </div>
        </div>
      </div>
    </div>
  )
}