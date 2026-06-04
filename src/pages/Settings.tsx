import { useState } from "react"
import { User, Bell, Shield, Camera, Save } from "lucide-react"

export default function Settings() {
  const [notifications, setNotifications] = useState({
    telegram: true,
    sms: false,
    email: true,
    sound: true,
  })

  const [profile, setProfile] = useState({
    name: "Ichki Ishlar",
    email: "admin@ichkiishlar.uz",
    phone: "+998 90 123 45 67",
    region: "Toshkent shahri",
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-lg font-medium text-gray-900">Sozlamalar</h1>
        <p className="text-sm text-gray-400">Tizim va profil sozlamalari</p>
      </div>

      {/* Profile */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
          <User size={15} className="text-blue-500" />
          <p className="text-sm font-medium text-gray-800">Profil ma'lumotlari</p>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Ism</label>
              <input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Email</label>
              <input
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Telefon</label>
              <input
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Hudud</label>
              <select
                value={profile.region}
                onChange={(e) => setProfile({ ...profile, region: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              >
                <option>Toshkent shahri</option>
                <option>Toshkent viloyati</option>
                <option>Samarqand</option>
                <option>Buxoro</option>
                <option>Andijon</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
          <Bell size={15} className="text-blue-500" />
          <p className="text-sm font-medium text-gray-800">Bildirishnomalar</p>
        </div>
        <div className="p-4 space-y-3">
          {[
            { key: "telegram", label: "Telegram", desc: "Telegram bot orqali xabar" },
            { key: "sms", label: "SMS", desc: "Telefonga SMS yuborish" },
            { key: "email", label: "Email", desc: "Elektron pochta orqali" },
            { key: "sound", label: "Ovozli signal", desc: "Dashboard da ovoz" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm text-gray-800">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] })}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  notifications[key as keyof typeof notifications] ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notifications[key as keyof typeof notifications] ? "translate-x-5" : "translate-x-0.5"
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
          <Shield size={15} className="text-blue-500" />
          <p className="text-sm font-medium text-gray-800">Xavfsizlik</p>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Joriy parol</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Yangi parol</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Yangi parolni tasdiqlang</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Camera settings */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
          <Camera size={15} className="text-blue-500" />
          <p className="text-sm font-medium text-gray-800">Kamera sozlamalari</p>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Tahlil tezligi (FPS)</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
                <option>15 FPS</option>
                <option>24 FPS</option>
                <option>30 FPS</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Rasm sifati</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
                <option>720p</option>
                <option>1080p</option>
                <option>4K</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          saved
            ? "bg-green-500 text-white"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <Save size={15} />
        {saved ? "Saqlandi ✓" : "Saqlash"}
      </button>
    </div>
  )
}