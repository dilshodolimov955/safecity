

import { NavLink } from "react-router-dom"
import {
  LayoutDashboard, Map, Bell, List,
  Camera, FileText, Settings, Shield, LogOut, Activity,
} from "lucide-react"

type Lang = "uz" | "ru" | "en"

const labels: Record<Lang, string[]> = {
  uz: ["Dashboard", "Xarita", "Ogohlantirishlar", "Qora ro'yxat", "Kameralar", "Anomaliya", "Hisobotlar", "Sozlamalar"],
  ru: ["Панель", "Карта", "Оповещения", "Чёрный список", "Камеры", "Аномалии", "Отчёты", "Настройки"],
  en: ["Dashboard", "Map", "Alerts", "Blacklist", "Cameras", "Anomaly", "Reports", "Settings"],
}

const paths = ["/", "/map", "/alerts", "/blacklist", "/cameras", "/anomaly", "/reports", "/settings"]
const icons = [LayoutDashboard, Map, Bell, List, Camera, Activity, FileText, Settings]

const themes = [
  { key: "default", colors: ["#3b82f6", "#10b981"] },
  { key: "purple", colors: ["#8b5cf6", "#ec4899"] },
  { key: "orange", colors: ["#f97316", "#eab308"] },
]

export default function Sidebar({
  lang, setLang, theme, setTheme, user, onLogout,
}: {
  lang: Lang
  setLang: (l: Lang) => void
  theme: string
  setTheme: (t: string) => void
  user: { username: string; role: string }
  onLogout: () => void
}) {
  return (
    <aside style={{
      width: "220px", height: "100vh", background: "var(--bg2)",
      borderRight: "1px solid var(--border)", display: "flex",
      flexDirection: "column", position: "fixed", left: 0, top: 0, zIndex: 100,
    }}>

      {/* Logo */}
      <div style={{
        padding: "18px 16px", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: "10px",
      }}>
        <div style={{
          width: "34px", height: "34px", borderRadius: "10px",
          background: "linear-gradient(135deg, var(--blue), var(--green))",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Shield size={17} color="white" />
        </div>
        <div>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--t1)", lineHeight: 1 }}>Safe City</p>
          <p style={{ fontSize: "10px", color: "var(--t2)", marginTop: "2px" }}>Analytics</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{
        flex: 1, padding: "10px 8px",
        display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto",
      }}>
        {paths.map((to, i) => {
          const Icon = icons[i]
          return (
            <NavLink key={to} to={to} end={to === "/"}
              style={({ isActive }) => ({
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 12px", borderRadius: "9px",
                fontSize: "13px", fontWeight: isActive ? 600 : 400,
                color: isActive ? "var(--blue2)" : "var(--t2)",
                background: isActive ? "rgba(59,130,246,0.1)" : "transparent",
                borderLeft: isActive ? "2px solid var(--blue)" : "2px solid transparent",
                textDecoration: "none", transition: "all 0.2s",
              })}
            >
              <Icon size={15} />
              {labels[lang][i]}
            </NavLink>
          )
        })}
      </nav>

      {/* Til */}
      <div style={{ padding: "10px 8px", borderTop: "1px solid var(--border)" }}>
        <p style={{
          fontSize: "10px", color: "var(--t3)", marginBottom: "6px",
          paddingLeft: "4px", textTransform: "uppercase", letterSpacing: "0.6px",
        }}>
          {lang === "uz" ? "Til" : lang === "ru" ? "Язык" : "Language"}
        </p>
        <div style={{ display: "flex", gap: "4px" }}>
          {(["uz", "ru", "en"] as Lang[]).map((l) => (
            <button key={l} onClick={() => setLang(l)} style={{
              flex: 1, padding: "6px 0", borderRadius: "7px", fontSize: "11px",
              fontWeight: lang === l ? 700 : 400, cursor: "pointer",
              border: "1px solid",
              borderColor: lang === l ? "var(--blue)" : "var(--border)",
              background: lang === l ? "rgba(59,130,246,0.1)" : "transparent",
              color: lang === l ? "var(--blue2)" : "var(--t2)",
              transition: "all .2s",
            }}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Rang */}
      <div style={{ padding: "10px 8px", borderTop: "1px solid var(--border)" }}>
        <p style={{
          fontSize: "10px", color: "var(--t3)", marginBottom: "6px",
          paddingLeft: "4px", textTransform: "uppercase", letterSpacing: "0.6px",
        }}>
          {lang === "uz" ? "Rang" : lang === "ru" ? "Тема" : "Theme"}
        </p>
        <div style={{ display: "flex", gap: "8px", paddingLeft: "4px" }}>
          {themes.map((th) => (
            <button key={th.key} onClick={() => setTheme(th.key)} style={{
              width: "26px", height: "26px", borderRadius: "50%",
              background: `linear-gradient(135deg, ${th.colors[0]}, ${th.colors[1]})`,
              border: theme === th.key ? "2px solid var(--t1)" : "2px solid transparent",
              cursor: "pointer", transition: "all .2s", outline: "none",
            }} />
          ))}
        </div>
      </div>

      {/* User + Logout */}
      <div style={{
        padding: "12px 16px", borderTop: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: "10px",
      }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: "linear-gradient(135deg, var(--blue), var(--green))",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "11px", fontWeight: 700, color: "white", flexShrink: 0,
        }}>
          {user.username.slice(0, 2).toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: "12px", fontWeight: 600, color: "var(--t1)",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {user.username}
          </p>
          <p style={{ fontSize: "10px", color: "var(--t2)" }}>{user.role}</p>
        </div>
        <button onClick={onLogout} title="Chiqish" style={{
          background: "none", border: "none", cursor: "pointer",
          color: "var(--t3)", padding: "4px", borderRadius: "6px",
          transition: "color .2s", display: "flex", alignItems: "center",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--red)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--t3)")}
        >
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  )
}