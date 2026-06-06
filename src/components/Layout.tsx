import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

type Lang = "uz" | "ru" | "en"

export default function Layout({
  lang,
  setLang,
  theme,
  setTheme,
  user,
  onLogout,
}: {
  lang: Lang
  setLang: (l: Lang) => void
  theme: string
  setTheme: (t: string) => void
  user: { username: string; role: string }
  onLogout: () => void
}) {
  return (
    <div style={{ display: "flex", background: "var(--bg)", minHeight: "100vh" }}>
      <Sidebar
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        user={user}
        onLogout={onLogout}
      />
      <main style={{ marginLeft: "220px", flex: 1, minHeight: "100vh" }}>
        <Outlet />
      </main>
    </div>
  )
}