import { FileText, Download, TrendingUp, TrendingDown, Calendar } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts"

type Lang = "uz" | "ru" | "en"

const t = {
  uz: { title: "Hisobotlar", sub: "Tahlil va statistika", download: "PDF yuklab olish", thisMonth: "Bu oy", lastMonth: "O'tgan oy", solved: "Hal qilingan", fines: "Jarimalar", monthly: "Oylik statistika", types: "Hodisa turlari", archive: "Arxiv hisobotlar", efficiency: "samaradorlik", stolen: "O'g'irlangan", wanted: "Qidirilmoqda", speed: "Tezlik buzish", other: "Boshqa", dl: "Yuklab olish" },
  ru: { title: "Отчёты", sub: "Анализ и статистика", download: "Скачать PDF", thisMonth: "Этот месяц", lastMonth: "Прошлый месяц", solved: "Решено", fines: "Штрафы", monthly: "Ежемесячная статистика", types: "Типы инцидентов", archive: "Архив отчётов", efficiency: "эффективность", stolen: "Украдено", wanted: "В розыске", speed: "Превышение", other: "Другое", dl: "Скачать" },
  en: { title: "Reports", sub: "Analysis & statistics", download: "Download PDF", thisMonth: "This month", lastMonth: "Last month", solved: "Solved", fines: "Fines", monthly: "Monthly statistics", types: "Incident types", archive: "Archive reports", efficiency: "efficiency", stolen: "Stolen", wanted: "Wanted", speed: "Speeding", other: "Other", dl: "Download" },
}

const monthlyData = [
  { month: "Aug", count: 45 },
  { month: "Sep", count: 52 },
  { month: "Oct", count: 38 },
  { month: "Nov", count: 61 },
  { month: "Dec", count: 55 },
  { month: "Jan", count: 42 },
]

const areaData = [
  { day: "1", count: 8 },
  { day: "5", count: 14 },
  { day: "10", count: 11 },
  { day: "15", count: 19 },
  { day: "20", count: 16 },
  { day: "25", count: 22 },
  { day: "30", count: 18 },
]

const pieData = [
  { key: "stolen", value: 42, color: "#f87171" },
  { key: "wanted", value: 31, color: "#fbbf24" },
  { key: "speed", value: 18, color: "#3b82f6" },
  { key: "other", value: 9, color: "#3d5070" },
]

const archiveReports = [
  { title: "Yanvar 2024", date: "2024-01-31", size: "2.4 MB" },
  { title: "Dekabr 2023", date: "2023-12-31", size: "3.1 MB" },
  { title: "Noyabr 2023", date: "2023-11-30", size: "2.8 MB" },
  { title: "Oktyabr 2023", date: "2023-10-31", size: "2.2 MB" },
]

const summaryCards = [
  { key: "thisMonth", value: 248, icon: TrendingUp, color: "var(--red)", trend: "+12%", trendUp: true },
  { key: "lastMonth", value: 221, icon: TrendingDown, color: "var(--green)", trend: "-5%", trendUp: false },
  { key: "solved", value: 184, icon: TrendingUp, color: "var(--blue)", trend: "74%", trendUp: true },
  { key: "fines", value: 63, icon: FileText, color: "var(--amber)", trend: "Bu oy", trendUp: true },
]

export default function Reports({ lang = "uz" }: { lang?: Lang }) {
  const tr = t[lang]

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }} className="fade-up">

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: 600, color: "var(--t1)" }}>{tr.title}</h1>
          <p style={{ fontSize: "13px", color: "var(--t2)", marginTop: "4px" }}>{tr.sub}</p>
        </div>
        <button className="btn btn-blue">
          <Download size={14} /> {tr.download}
        </button>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }}>
        {summaryCards.map(({ key, value, color, trend, trendUp }, i) => (
          <div key={key} className="card" style={{
            padding: "18px",
            animation: `fadeUp .4s ease ${i * 0.07}s forwards`,
            opacity: 0,
          }}>
            <p style={{ fontSize: "11px", color: "var(--t2)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {tr[key as keyof typeof tr]}
            </p>
            <p style={{ fontSize: "28px", fontWeight: 700, color }}>{value}</p>
            <p style={{ fontSize: "11px", color: trendUp ? "var(--green2)" : "var(--red)", marginTop: "6px" }}>
              {trend} {key === "solved" ? tr.efficiency : ""}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "14px" }}>

        {/* Bar chart */}
        <div className="card" style={{ padding: "20px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--t1)", marginBottom: "16px" }}>{tr.monthly}</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barSize={28}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--t2)" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px", color: "var(--t1)" }} cursor={{ fill: "rgba(59,130,246,0.05)" }} />
              <Bar dataKey="count" fill="var(--blue)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="card" style={{ padding: "20px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--t1)", marginBottom: "16px" }}>{tr.types}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <ResponsiveContainer width="55%" height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {pieData.map((item) => (
                <div key={item.key} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                  <span style={{ fontSize: "11px", color: "var(--t2)" }}>{tr[item.key as keyof typeof tr]}</span>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--t1)", marginLeft: "auto" }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Area chart */}
      <div className="card" style={{ padding: "20px" }}>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--t1)", marginBottom: "16px" }}>Trend — Yanvar 2024</p>
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={areaData}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--green)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--green)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--t2)" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px", color: "var(--t1)" }} />
            <Area type="monotone" dataKey="count" stroke="var(--green)" strokeWidth={2} fill="url(#areaGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Archive */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--t1)" }}>{tr.archive}</p>
        </div>
        {archiveReports.map((r, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: i < archiveReports.length - 1 ? "1px solid var(--border)" : "none",
            transition: "background .15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--hover)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: "rgba(59,130,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FileText size={15} color="var(--blue2)" />
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--t1)" }}>{r.title}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                  <Calendar size={11} color="var(--t2)" />
                  <span style={{ fontSize: "11px", color: "var(--t2)" }}>{r.date}</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "11px", color: "var(--t3)" }}>{r.size}</span>
              <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: "11px", display: "flex", alignItems: "center", gap: "5px" }}>
                <Download size={12} /> {tr.dl}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}