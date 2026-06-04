import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { alerts, weeklyStats } from "../data/mock"

const translations = {
  uz: {
    title: "Dashboard",
    subtitle: "Bugungi holat — real vaqt",
    incidents: "Bugungi hodisalar",
    scanned: "Skanerlangan",
    blacklist: "Qora ro'yxat topildi",
    cameras: "Faol kameralar",
    weekly: "Haftalik hodisalar",
    recent: "Oxirgi ogohlantirishlar",
    stolen: "O'g'irlangan",
    wanted: "Qidirilmoqda",
    escaped: "Qochgan",
    today: "bugun",
    more: "Batafsil",
  },
  ru: {
    title: "Панель",
    subtitle: "Сегодняшнее состояние — реальное время",
    incidents: "Происшествий сегодня",
    scanned: "Отсканировано",
    blacklist: "Найдено в чёрном списке",
    cameras: "Активные камеры",
    weekly: "Еженедельные инциденты",
    recent: "Последние оповещения",
    stolen: "Украден",
    wanted: "В розыске",
    escaped: "Сбежал",
    today: "сегодня",
    more: "Подробнее",
  },
  en: {
    title: "Dashboard",
    subtitle: "Today's status — real time",
    incidents: "Today's incidents",
    scanned: "Scanned",
    blacklist: "Blacklist hits",
    cameras: "Active cameras",
    weekly: "Weekly incidents",
    recent: "Recent alerts",
    stolen: "Stolen",
    wanted: "Wanted",
    escaped: "Escaped",
    today: "today",
    more: "Details",
  },
}

const stats = [
  { key: "incidents", value: 24, color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: "⚠" },
  { key: "scanned", value: 187, color: "#3b82f6", bg: "rgba(59,130,246,0.1)", icon: "🚗" },
  { key: "blacklist", value: 7, color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: "🔴" },
  { key: "cameras", value: 42, color: "#10b981", bg: "rgba(16,185,129,0.1)", icon: "📷" },
]

const typeBadge: Record<string, string> = {
  stolen: "badge-red",
  wanted: "badge-amber",
  escaped: "badge-red",
}

type Lang = "uz" | "ru" | "en"

export default function Dashboard({ lang = "uz" }: { lang?: Lang }) {
  const t = translations[lang]
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [lang])

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}
      className={visible ? "fade-up" : ""}
    >
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "var(--t1)" }}>{t.title}</h1>
        <p style={{ fontSize: "13px", color: "var(--t2)", marginTop: "4px" }}>{t.subtitle}</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px" }}>
        {stats.map(({ key, value, color, bg, icon }, i) => (
          <div key={key} className="card" style={{
            padding: "18px",
            animationDelay: `${i * 0.08}s`,
            animation: "fadeUp .4s ease forwards",
            opacity: 0,
          }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: bg, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "18px", marginBottom: "12px"
            }}>{icon}</div>
            <p style={{ fontSize: "11px", color: "var(--t2)", marginBottom: "6px" }}>
              {t[key as keyof typeof t]}
            </p>
            <p style={{ fontSize: "26px", fontWeight: 700, color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "16px" }}>

        {/* Bar chart */}
        <div className="card" style={{ padding: "20px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, marginBottom: "16px", color: "var(--t1)" }}>
            {t.weekly}
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyStats} barSize={28}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--t2)" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "var(--card)", border: "1px solid var(--border)",
                  borderRadius: "8px", fontSize: "12px", color: "var(--t1)"
                }}
                cursor={{ fill: "rgba(59,130,246,0.05)" }}
              />
              <Bar dataKey="count" fill="var(--blue)" radius={[6, 6, 0, 0]}
                style={{ filter: "drop-shadow(0 0 6px rgba(59,130,246,0.4))" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Area chart */}
        <div className="card" style={{ padding: "20px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, marginBottom: "16px", color: "var(--t1)" }}>
            Trend
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyStats}>
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--t2)" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "var(--card)", border: "1px solid var(--border)",
                  borderRadius: "8px", fontSize: "12px", color: "var(--t1)"
                }}
              />
              <Area type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2}
                fill="url(#greenGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent alerts */}
      <div className="card" style={{ padding: "20px" }}>
        <p style={{ fontSize: "13px", fontWeight: 600, marginBottom: "16px", color: "var(--t1)" }}>
          {t.recent}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {alerts.map((a, i) => (
            <div key={a.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 16px", borderRadius: "10px", background: "var(--bg2)",
              border: "1px solid var(--border)",
              animation: `fadeUp .4s ease ${i * 0.06}s forwards`, opacity: 0,
              transition: "background .2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--hover)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--bg2)")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: a.status === "high" ? "var(--red)" : "var(--amber)",
                  boxShadow: `0 0 8px ${a.status === "high" ? "var(--red)" : "var(--amber)"}`,
                }} className="pulse" />
                <span style={{ fontFamily: "monospace", fontWeight: 600, fontSize: "14px", color: "var(--t1)" }}>
                  {a.plate}
                </span>
                <span style={{ fontSize: "12px", color: "var(--t2)" }}>{a.location}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span className={`badge ${typeBadge[a.type]}`}>
                  {t[a.type as keyof typeof t]}
                </span>
                <span style={{ fontSize: "11px", color: "var(--t3)" }}>{a.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}