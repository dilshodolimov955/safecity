import { useState } from "react"
import { Shield, Eye, EyeOff, Lock, User } from "lucide-react"

export default function Login({ onLogin }: { onLogin: (user: { username: string; role: string }) => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (!username || !password) {
      setError("Login va parol kiriting!")
      return
    }
    setLoading(true)
    setError("")

    setTimeout(() => {
      if (username.trim() === "admin" && password.trim() === "12345678") {
        onLogin({ username: "admin", role: "Super Admin" })
      } else {
        setError("Login yoki parol noto'g'ri!")
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div className="card" style={{ width: "100%", maxWidth: "360px", padding: "36px", margin: "16px" }}>

        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "28px" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "14px",
            background: "linear-gradient(135deg, var(--blue), var(--green))",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "14px",
          }}>
            <Shield size={24} color="white" />
          </div>
          <h1 style={{ fontSize: "20px", fontWeight: 700, color: "var(--t1)", marginBottom: "4px" }}>
            Safe City
          </h1>
          <p style={{ fontSize: "12px", color: "var(--t2)" }}>
            Xavfsizlik monitoring tizimi
          </p>
        </div>

        {/* Username */}
        <div style={{ marginBottom: "12px" }}>
          <label style={{
            fontSize: "11px", color: "var(--t2)", display: "block",
            marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px",
          }}>
            Login
          </label>
          <div style={{ position: "relative" }}>
            <User size={14} style={{
              position: "absolute", left: "12px", top: "50%",
              transform: "translateY(-50%)", color: "var(--t3)", pointerEvents: "none",
            }} />
            <input
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError("") }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="admin"
              style={{ paddingLeft: "36px" }}
            />
          </div>
        </div>

        {/* Password */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{
            fontSize: "11px", color: "var(--t2)", display: "block",
            marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px",
          }}>
            Parol
          </label>
          <div style={{ position: "relative" }}>
            <Lock size={14} style={{
              position: "absolute", left: "12px", top: "50%",
              transform: "translateY(-50%)", color: "var(--t3)", pointerEvents: "none",
            }} />
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError("") }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="••••••••"
              style={{ paddingLeft: "36px", paddingRight: "40px" }}
            />
            <button type="button" onClick={() => setShowPass(!showPass)}
              style={{
                position: "absolute", right: "12px", top: "50%",
                transform: "translateY(-50%)", background: "none",
                border: "none", cursor: "pointer", color: "var(--t2)",
                padding: 0, display: "flex", alignItems: "center",
              }}>
              {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(248,113,113,0.1)",
            border: "1px solid rgba(248,113,113,0.25)",
            borderRadius: "8px", padding: "10px 14px",
            fontSize: "12px", color: "var(--red)", marginBottom: "14px",
          }}>
            {error}
          </div>
        )}

        {/* Tugma */}
        <button type="button" onClick={handleSubmit} disabled={loading}
          style={{
            width: "100%", padding: "12px", borderRadius: "9px",
            border: "none", background: "var(--blue)", color: "white",
            fontSize: "14px", fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "all .2s", fontFamily: "Inter, sans-serif",
          }}>
          {loading ? "⏳ Kirish..." : "Kirish"}
        </button>

      </div>
    </div>
  )
}