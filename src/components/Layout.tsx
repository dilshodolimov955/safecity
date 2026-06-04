import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

type Lang = "uz" | "ru" | "en"

export default function Layout({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div style={{ display: "flex", background: "var(--bg)", minHeight: "100vh" }}>
      <Sidebar lang={lang} setLang={setLang} />
      <main style={{ marginLeft: "220px", flex: 1, minHeight: "100vh", background: "var(--bg)" }}>
        <Outlet />
      </main>
    </div>
  )
}