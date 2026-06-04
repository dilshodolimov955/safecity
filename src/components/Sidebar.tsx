import { NavLink } from "react-router-dom"
import {
  LayoutDashboard, Map, Bell, List, Camera, FileText, Settings, Shield
} from "lucide-react"

type Lang = "uz" | "ru" | "en"

const labels = {
  uz: ["Dashboard", "Xarita", "Ogohlantirishlar", "Qora ro'yxat", "Kameralar", "Hisobotlar", "Sozlamalar"],
  ru: ["Панель", "Карта", "Оповещения", "Чёрный список", "Камеры", "Отчёты", "Настройки"],
  en: ["Dashboard", "Map", "Alerts", "Blacklist", "Cameras", "Reports", "Settings"],
}

const paths = ["/", "/map", "/alerts", "/blacklist", "/cameras", "/reports", "/settings"]
const icons = [LayoutDashboard, Map, Bell, List, Camera, FileText, Settings]

export default function Sidebar({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <aside style={{
      width: "220px", height: "100vh", background: "var(--bg2)",
      borderRight: "1px solid var(--border)", display: "flex",
      flexDirection: "column", position: "fixed", left: 0, top: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: "20px 16px", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: "10px"
      }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "8px",
          background: "linear-gradient(135deg, var(--blue), var(--green))",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 12px rgba(59,130,246,0.4)"
        }}>
          <Shield size={16} color="white" />
        </div>
        <span style={{ fontWeight: 700, fontSize: "15px", color: "var(--t1)" }}>Safe City</span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: "2px" }}>
        {paths.map((to, i) => {
          const Icon = icons[i]
          return (
            <NavLink key={to} to={to} end={to === "/"}
              style={({ isActive }) => ({
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 12px", borderRadius: "8px",
                fontSize: "13px", fontWeight: isActive ? 600 : 400,
                color: isActive ? "var(--blue2)" : "var(--t2)",
                background: isActive ? "var(--blue3)" : "transparent",
                textDecoration: "none",
                transition: "all .2s",
                borderLeft: isActive ? "2px solid var(--blue)" : "2px solid transparent",
              })}
              onMouseEnter={e => {
                const el = e.currentTarget
                if (!el.className.includes("active")) {
                  el.style.background = "var(--hover)"
                  el.style.color = "var(--t1)"
                }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                if (!el.style.borderLeftColor.includes("rgb(59")) {
                  el.style.background = "transparent"
                  el.style.color = "var(--t2)"
                }
              }}
            >
              <Icon size={15} />
              {labels[lang][i]}
            </NavLink>
          )
        })}
      </nav>

      {/* Language switcher */}
      <div style={{
        padding: "12px 8px", borderTop: "1px solid var(--border)",
        display: "flex", gap: "6px"
      }}>
        {(["uz", "ru", "en"] as Lang[]).map((l) => (
          <button key={l} onClick={() => setLang(l)}
            style={{
              flex: 1, padding: "6px", borderRadius: "6px", fontSize: "12px",
              fontWeight: lang === l ? 600 : 400, cursor: "pointer",
              border: "1px solid",
              borderColor: lang === l ? "var(--blue)" : "var(--border)",
              background: lang === l ? "var(--blue3)" : "transparent",
              color: lang === l ? "var(--blue2)" : "var(--t2)",
              transition: "all .2s",
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* User */}
      <div style={{
        padding: "12px 16px", borderTop: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: "10px"
      }}>
        <div style={{
          width: "30px", height: "30px", borderRadius: "50%",
          background: "linear-gradient(135deg, var(--blue), var(--green))",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "11px", fontWeight: 700, color: "white"
        }}>IB</div>
        <div>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--t1)" }}>Ichki Ishlar</p>
          <p style={{ fontSize: "11px", color: "var(--t2)" }}>Admin</p>
        </div>
      </div>
    </aside>
  )
}