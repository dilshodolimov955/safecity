import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Map from "./pages/Map"
import Alerts from "./pages/Alerts"
import Blacklist from "./pages/Blacklist"
import Cameras from "./pages/Cameras"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"

type Lang = "uz" | "ru" | "en"

export default function App() {
  const [lang, setLang] = useState<Lang>("uz")

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout lang={lang} setLang={setLang} />}>
          <Route index element={<Dashboard lang={lang} />} />
          <Route path="map" element={<Map />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="blacklist" element={<Blacklist />} />
          <Route path="cameras" element={<Cameras />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}