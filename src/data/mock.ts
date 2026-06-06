import type { Alert, Camera, Vehicle } from "../types"

export const alerts: Alert[] = [
  { id: 1, plate: "01A123BC", location: "Chorsu ko'chasi", time: "14:32:05", type: "stolen", status: "high" },
  { id: 2, plate: "30X456AA", location: "Chilonzor 3-mavze", time: "13:18:44", type: "wanted", status: "medium" },
  { id: 3, plate: "10B789CD", location: "Yunusobod 11", time: "11:05:20", type: "escaped", status: "high" },
  { id: 4, plate: "20C321EF", location: "Sergeli tumani", time: "09:44:10", type: "stolen", status: "high" },
  { id: 5, plate: "40D654GH", location: "Mirzo Ulugbek", time: "08:22:33", type: "wanted", status: "medium" },
]

export const cameras: Camera[] = [
  { id: 1, name: "Chorsu-1", location: "Chorsu bozori kirish", status: "online", zone: "Yunusobod" },
  { id: 2, name: "Chilonzor-3", location: "3-mavze chorraha", status: "online", zone: "Chilonzor" },
  { id: 3, name: "Sergeli-2", location: "Sergeli magistral", status: "offline", zone: "Sergeli" },
  { id: 4, name: "Yunusobod-5", location: "11-mavze kirish", status: "online", zone: "Yunusobod" },
  { id: 5, name: "MirzoUlugbek-1", location: "Asosiy ko'cha", status: "online", zone: "Mirzo Ulugbek" },
]

export const vehicles: Vehicle[] = [
  { id: 1, plate: "01A123BC", owner: "Aliyev Vohid", reason: "O'g'irlangan", addedDate: "2024-01-10", type: "stolen" },
  { id: 2, plate: "30X456AA", owner: "Karimov Jasur", reason: "Qidirilmoqda", addedDate: "2024-01-12", type: "wanted" },
  { id: 3, plate: "10B789CD", owner: "Rahimov Sardor", reason: "Qamoqdan qochgan", addedDate: "2024-01-14", type: "escaped" },
  { id: 4, plate: "20C321EF", owner: "Umarov Bekzod", reason: "O'g'irlangan", addedDate: "2024-01-15", type: "stolen" },
]

export const weeklyStats = [
  { day: "Du", count: 12 },
  { day: "Se", count: 18 },
  { day: "Ch", count: 9 },
  { day: "Pa", count: 22 },
  { day: "Ju", count: 25 },
  { day: "Sh", count: 31 },
  { day: "Ya", count: 16 },
]

export interface Anomaly {
  id: number
  type: "fight" | "fall" | "crowd" | "weapon" | "run"
  location: string
  camera: string
  time: string
  status: "active" | "resolved"
  confidence: number
}

export const anomalies: Anomaly[] = [
  { id: 1, type: "fight", location: "Chorsu bozori", camera: "Chorsu-1", time: "14:32:05", status: "active", confidence: 87 },
  { id: 2, type: "fall", location: "Metro kirish", camera: "Yunusobod-5", time: "13:15:22", status: "resolved", confidence: 94 },
  { id: 3, type: "crowd", location: "Alay bozori", camera: "Chilonzor-3", time: "12:44:10", status: "active", confidence: 96 },
  { id: 4, type: "run", location: "Sergeli magistral", camera: "Sergeli-2", time: "11:30:05", status: "resolved", confidence: 79 },
  { id: 5, type: "fight", location: "Yunusobod 11", camera: "Yunusobod-5", time: "10:22:33", status: "active", confidence: 82 },
  { id: 6, type: "fall", location: "Mirzo Ulugbek", camera: "MirzoUlugbek-1", time: "09:11:44", status: "resolved", confidence: 91 },
]