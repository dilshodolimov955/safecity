import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Map from "./pages/Map"
import Alerts from "./pages/Alerts"
import Blacklist from "./pages/Blacklist"
import Cameras from "./pages/Cameras"
import AnomalyPage from "./pages/Anomaly"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"

type Lang = "uz" | "ru" | "en"
type User = { username: string; role: string }

const themeColors: Record<string, Record<string, string>> = {
  default: { "--blue": "#3b82f6", "--blue2": "#93c5fd", "--blue3": "#172554", "--green": "#10b981", "--green2": "#6ee7b7" },
  purple: { "--blue": "#8b5cf6", "--blue2": "#c4b5fd", "--blue3": "#2e1065", "--green": "#ec4899", "--green2": "#f9a8d4" },
  orange: { "--blue": "#f97316", "--blue2": "#fdba74", "--blue3": "#431407", "--green": "#eab308", "--green2": "#fde047" },
}

export default function App() {
  const [lang, setLang] = useState<Lang>("uz")
  const [theme, setTheme] = useState("default")
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const root = document.documentElement
    const colors = themeColors[theme]
    Object.entries(colors).forEach(([key, val]) => root.style.setProperty(key, val))
  }, [theme])

  const handleLogin = (u: User) => setUser(u)
  const handleLogout = () => setUser(null)

  if (!user) return <Login onLogin={handleLogin} />

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              lang={lang}
              setLang={setLang}
              theme={theme}
              setTheme={setTheme}
              user={user}
              onLogout={handleLogout}
            />
          }
        >
          <Route index element={<Dashboard lang={lang} />} />
          <Route path="map" element={<Map lang={lang} />} />
          <Route path="alerts" element={<Alerts lang={lang} />} />
          <Route path="blacklist" element={<Blacklist lang={lang} />} />
          <Route path="cameras" element={<Cameras lang={lang} />} />
          <Route path="anomaly" element={<AnomalyPage lang={lang} />} />
          <Route path="reports" element={<Reports lang={lang} />} />
          <Route path="settings" element={<Settings lang={lang} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}