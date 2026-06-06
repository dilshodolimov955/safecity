import { useState } from "react"
import { AlertTriangle, Users, PersonStanding, Zap, Wind, Search, CheckCircle, Clock } from "lucide-react"
import { anomalies, type Anomaly } from "../data/mock"

type Lang = "uz" | "ru" | "en"

const t = {
  uz: {
    title: "Anomaliya aniqlash", sub: "AI tomonidan aniqlangan hodisalar",
    all: "Barchasi", active: "Faol", resolved: "Hal qilindi",
    fight: "Janjal", fall: "Yiqilish", crowd: "Olomon", weapon: "Qurol", run: "Qochish",
    search: "Qidirish...", confidence: "Aniqlik", camera: "Kamera",
    resolve: "Hal qilindi", active_badge: "Faol", resolved_badge: "Hal qilindi",
    total: "Jami", today: "Bugun",
  },
  ru: {
    title: "Обнаружение аномалий", sub: "Инциденты, обнаруженные ИИ",
    all: "Все", active: "Активные", resolved: "Решённые",
    fight: "Драка", fall: "Падение", crowd: "Толпа", weapon: "Оружие", run: "Побег",
    search: "Поиск...", confidence: "Точность", camera: "Камера",
    resolve: "Решено", active_badge: "Активно", resolved_badge: "Решено",
    total: "Всего", today: "Сегодня",
  },
  en: {
    title: "Anomaly detection", sub: "AI detected incidents",
    all: "All", active: "Active", resolved: "Resolved",
    fight: "Fight", fall: "Fall", crowd: "Crowd", weapon: "Weapon", run: "Running",
    search: "Search...", confidence: "Confidence", camera: "Camera",
    resolve: "Resolved", active_badge: "Active", resolved_badge: "Resolved",
    total: "Total", today: "Today",
  },
}

const typeConfig = {
  fight: { icon: Zap, color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)" },
  fall: { icon: PersonStanding, color: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)" },
  crowd: { icon: Users, color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
  weapon: { icon: AlertTriangle, color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)" },
  run: { icon: Wind, color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
}

export default function AnomalyPage({ lang = "uz" }: { lang?: Lang }) {
  const tr = t[lang]
  const [list, setList] = useState<Anomaly[]>(anomalies)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = list.filter((a) => {
    const matchSearch = a.location.toLowerCase().includes(search.toLowerCase()) ||
      a.camera.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "all" || a.status === filter
    const matchType = typeFilter === "all" || a.type === typeFilter
    return matchSearch && matchFilter && matchType
  })

  const resolve = (id: number) => {
    setList(list.map((a) => a.id === id ? { ...a, status: "resolved" } : a))
  }

  const activeCount = list.filter((a) => a.status === "active").length
  const resolvedCount = list.filter((a) => a.status === "resolved").length

  const summaryCards = [
    { label: tr.total, value: list.length, color: "var(--blue)", bg: "rgba(59,130,246,0.1)" },
    { label: tr.active, value: activeCount, color: "var(--red)", bg: "rgba(248,113,113,0.1)" },
    { label: tr.resolved, value: resolvedCount, color: "var(--green)", bg: "rgba(16,185,129,0.1)" },
    { label: "AI aniqlik", value: "88%", color: "var(--amber)", bg: "rgba(251,191,36,0.1)" },
  ]

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }} className="fade-up">

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: 600, color: "var(--t1)" }}>{tr.title}</h1>
          <p style={{ fontSize: "13px", color: "var(--t2)", marginTop: "4px" }}>{tr.sub}</p>
        </div>
        {activeCount > 0 && (
          <div style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)",
            borderRadius: "9px", padding: "8px 14px",
          }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--red)" }} className="pulse" />
            <span style={{ fontSize: "13px", color: "var(--red)", fontWeight: 600 }}>
              {activeCount} ta faol hodisa
            </span>
          </div>
        )}
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }}>
        {summaryCards.map(({ label, value, color, bg }, i) => (
          <div key={label} className="card" style={{
            padding: "18px",
            animation: `fadeUp .4s ease ${i * 0.07}s forwards`,
            opacity: 0,
          }}>
            <p style={{ fontSize: "11px", color: "var(--t2)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {label}
            </p>
            <p style={{ fontSize: "28px", fontWeight: 700, color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Type cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "10px" }}>
        {(Object.keys(typeConfig) as Array<keyof typeof typeConfig>).map((type) => {
          const cfg = typeConfig[type]
          const Icon = cfg.icon
          const count = list.filter((a) => a.type === type).length
          return (
            <div key={type} className="card" style={{
              padding: "14px",
              cursor: "pointer",
              border: typeFilter === type ? `1px solid ${cfg.color}` : undefined,
              background: typeFilter === type ? cfg.bg : undefined,
            }}
              onClick={() => setTypeFilter(typeFilter === type ? "all" : type)}
            >
              <div style={{
                width: "34px", height: "34px", borderRadius: "9px",
                background: cfg.bg, border: `1px solid ${cfg.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "10px",
              }}>
                <Icon size={16} color={cfg.color} />
              </div>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--t1)" }}>{tr[type as keyof typeof tr]}</p>
              <p style={{ fontSize: "20px", fontWeight: 700, color: cfg.color, marginTop: "4px" }}>{count}</p>
            </div>
          )
        })}
      </div>

      {/* Search + Filter */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--t3)" }} />
          <input placeholder={tr.search} value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: "36px" }} />
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {["all", "active", "resolved"].map((f) => (
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
        {filtered.map((a, i) => {
          const cfg = typeConfig[a.type]
          const Icon = cfg.icon
          return (
            <div key={a.id} className="card" style={{
              padding: "16px 18px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderLeft: `3px solid ${cfg.color}`,
              animation: `fadeUp .3s ease ${i * 0.05}s forwards`,
              opacity: 0,
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--hover)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--card)")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px",
                  background: cfg.bg, border: `1px solid ${cfg.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon size={18} color={cfg.color} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--t1)" }}>
                      {tr[a.type as keyof typeof tr]}
                    </p>
                    <span style={{
                      fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px",
                      background: a.status === "active" ? "rgba(248,113,113,0.15)" : "rgba(16,185,129,0.15)",
                      color: a.status === "active" ? "var(--red)" : "var(--green)",
                      border: `1px solid ${a.status === "active" ? "rgba(248,113,113,0.3)" : "rgba(16,185,129,0.3)"}`,
                    }}>
                      {a.status === "active" ? tr.active_badge : tr.resolved_badge}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{ fontSize: "12px", color: "var(--t2)" }}>📍 {a.location}</span>
                    <span style={{ fontSize: "12px", color: "var(--t2)" }}>📷 {a.camera}</span>
                    <span style={{ fontSize: "12px", color: "var(--t2)" }}>🕐 {a.time}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "10px", color: "var(--t3)", marginBottom: "2px" }}>{tr.confidence}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{
                      width: "60px", height: "4px", borderRadius: "2px",
                      background: "var(--border)", overflow: "hidden",
                    }}>
                      <div style={{
                        width: `${a.confidence}%`, height: "100%", borderRadius: "2px",
                        background: a.confidence > 90 ? "var(--green)" : a.confidence > 80 ? "var(--blue)" : "var(--amber)",
                      }} />
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--t1)" }}>{a.confidence}%</span>
                  </div>
                </div>

                {a.status === "active" ? (
                  <button onClick={() => resolve(a.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: "5px",
                      padding: "7px 12px", borderRadius: "8px", border: "1px solid rgba(16,185,129,0.3)",
                      background: "rgba(16,185,129,0.1)", color: "var(--green)",
                      fontSize: "11px", fontWeight: 600, cursor: "pointer",
                      transition: "all .2s", whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(16,185,129,0.2)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(16,185,129,0.1)")}
                  >
                    <CheckCircle size={13} /> Hal qilish
                  </button>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--t3)", fontSize: "11px" }}>
                    <Clock size={13} /> {tr.resolved_badge}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}