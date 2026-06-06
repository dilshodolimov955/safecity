import { useState } from "react"
import { User, Bell, Shield, Camera, Check } from "lucide-react"

type Lang = "uz" | "ru" | "en"

const t = {
  uz: {
    title: "Sozlamalar", sub: "Tizim va profil sozlamalari",
    profile: "Profil", notifications: "Bildirishnomalar", security: "Xavfsizlik", camera: "Kamera",
    name: "Ism", email: "Email", phone: "Telefon", region: "Hudud",
    telegram: "Telegram", telegramDesc: "Bot orqali xabar",
    sms: "SMS", smsDesc: "Telefonga SMS",
    emailNotif: "Email", emailDesc: "Elektron pochta",
    sound: "Ovoz", soundDesc: "Dashboard ovozi",
    currentPass: "Joriy parol", newPass: "Yangi parol", confirmPass: "Tasdiqlash",
    fps: "Tahlil tezligi", quality: "Sifat",
    save: "Saqlash", saved: "Saqlandi",
    regions: ["Toshkent shahri", "Toshkent viloyati", "Samarqand", "Buxoro", "Andijon"],
  },
  ru: {
    title: "Настройки", sub: "Системные настройки и профиль",
    profile: "Профиль", notifications: "Уведомления", security: "Безопасность", camera: "Камера",
    name: "Имя", email: "Email", phone: "Телефон", region: "Регион",
    telegram: "Telegram", telegramDesc: "Уведомления через бот",
    sms: "SMS", smsDesc: "SMS на телефон",
    emailNotif: "Email", emailDesc: "Электронная почта",
    sound: "Звук", soundDesc: "Звук на дашборде",
    currentPass: "Текущий пароль", newPass: "Новый пароль", confirmPass: "Подтверждение",
    fps: "Скорость анализа", quality: "Качество",
    save: "Сохранить", saved: "Сохранено",
    regions: ["Ташкент", "Ташкентская обл.", "Самарканд", "Бухара", "Андижан"],
  },
  en: {
    title: "Settings", sub: "System and profile settings",
    profile: "Profile", notifications: "Notifications", security: "Security", camera: "Camera",
    name: "Name", email: "Email", phone: "Phone", region: "Region",
    telegram: "Telegram", telegramDesc: "Bot notifications",
    sms: "SMS", smsDesc: "Phone SMS",
    emailNotif: "Email", emailDesc: "Email notifications",
    sound: "Sound", soundDesc: "Dashboard sound",
    currentPass: "Current password", newPass: "New password", confirmPass: "Confirm password",
    fps: "Analysis speed", quality: "Quality",
    save: "Save", saved: "Saved",
    regions: ["Tashkent city", "Tashkent region", "Samarkand", "Bukhara", "Andijan"],
  },
}

const sections = [
  { key: "profile", icon: User },
  { key: "notifications", icon: Bell },
  { key: "security", icon: Shield },
  { key: "camera", icon: Camera },
]

export default function Settings({ lang = "uz" }: { lang?: Lang }) {
  const tr = t[lang]
  const [active, setActive] = useState("profile")
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({ name: "Ichki Ishlar", email: "admin@ichkiishlar.uz", phone: "+998 90 123 45 67", region: 0 })
  const [notifs, setNotifs] = useState({ telegram: true, sms: false, emailNotif: true, sound: true })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
    <button onClick={onChange} style={{
      width: "42px", height: "22px", borderRadius: "11px", border: "none", cursor: "pointer",
      background: on ? "var(--blue)" : "var(--border)", position: "relative", transition: "background .2s", flexShrink: 0,
    }}>
      <div style={{
        width: "16px", height: "16px", borderRadius: "50%", background: "white",
        position: "absolute", top: "3px", transition: "left .2s",
        left: on ? "23px" : "3px",
      }} />
    </button>
  )

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }} className="fade-up">

      {/* Header */}
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "var(--t1)" }}>{tr.title}</h1>
        <p style={{ fontSize: "13px", color: "var(--t2)", marginTop: "4px" }}>{tr.sub}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "16px" }}>

        {/* Section nav */}
        <div className="card" style={{ padding: "8px", height: "fit-content" }}>
          {sections.map(({ key, icon: Icon }) => (
            <button key={key} onClick={() => setActive(key)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 12px", borderRadius: "9px", border: "none", cursor: "pointer",
                fontSize: "13px", fontWeight: active === key ? 600 : 400,
                color: active === key ? "var(--blue2)" : "var(--t2)",
                background: active === key ? "rgba(59,130,246,0.1)" : "transparent",
                borderLeft: active === key ? "2px solid var(--blue)" : "2px solid transparent",
                transition: "all .2s", marginBottom: "2px",
              }}
              onMouseEnter={e => { if (active !== key) e.currentTarget.style.background = "var(--hover)" }}
              onMouseLeave={e => { if (active !== key) e.currentTarget.style.background = "transparent" }}
            >
              <Icon size={15} />
              {tr[key as keyof typeof tr]}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="card" style={{ padding: "24px" }}>

          {/* Profile */}
          {active === "profile" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }} className="fade-in">
              <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--t1)", marginBottom: "4px" }}>{tr.profile}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "var(--t2)", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{tr.name}</label>
                  <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "var(--t2)", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{tr.email}</label>
                  <input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "var(--t2)", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{tr.phone}</label>
                  <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "var(--t2)", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{tr.region}</label>
                  <select value={profile.region} onChange={(e) => setProfile({ ...profile, region: Number(e.target.value) })}>
                    {tr.regions.map((r, i) => <option key={i} value={i}>{r}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {active === "notifications" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }} className="fade-in">
              <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--t1)", marginBottom: "12px" }}>{tr.notifications}</p>
              {[
                { key: "telegram", label: tr.telegram, desc: tr.telegramDesc },
                { key: "sms", label: tr.sms, desc: tr.smsDesc },
                { key: "emailNotif", label: tr.emailNotif, desc: tr.emailDesc },
                { key: "sound", label: tr.sound, desc: tr.soundDesc },
              ].map(({ key, label, desc }) => (
                <div key={key} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 0", borderBottom: "1px solid var(--border)",
                }}>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--t1)" }}>{label}</p>
                    <p style={{ fontSize: "11px", color: "var(--t2)", marginTop: "2px" }}>{desc}</p>
                  </div>
                  <Toggle on={notifs[key as keyof typeof notifs]} onChange={() => setNotifs({ ...notifs, [key]: !notifs[key as keyof typeof notifs] })} />
                </div>
              ))}
            </div>
          )}

          {/* Security */}
          {active === "security" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }} className="fade-in">
              <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--t1)", marginBottom: "4px" }}>{tr.security}</p>
              {[tr.currentPass, tr.newPass, tr.confirmPass].map((label) => (
                <div key={label}>
                  <label style={{ fontSize: "11px", color: "var(--t2)", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</label>
                  <input type="password" placeholder="••••••••" />
                </div>
              ))}
            </div>
          )}

          {/* Camera */}
          {active === "camera" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }} className="fade-in">
              <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--t1)", marginBottom: "4px" }}>{tr.camera}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "var(--t2)", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{tr.fps}</label>
                  <select>
                    <option>15 FPS</option>
                    <option>24 FPS</option>
                    <option selected>30 FPS</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "var(--t2)", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{tr.quality}</label>
                  <select>
                    <option>720p</option>
                    <option selected>1080p</option>
                    <option>4K</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Save */}
          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
            <button className="btn btn-blue" onClick={handleSave}
              style={{ background: saved ? "var(--green)" : "var(--blue)", transition: "background .3s" }}
            >
              {saved ? <><Check size={14} /> {tr.saved}</> : tr.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}