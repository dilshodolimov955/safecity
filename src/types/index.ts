export interface Alert {
  id: number
  plate: string
  location: string
  time: string
  type: "stolen" | "wanted" | "escaped"
  status: "high" | "medium"
}

export interface Camera {
  id: number
  name: string
  location: string
  status: "online" | "offline"
  zone: string
}

export interface Vehicle {
  id: number
  plate: string
  owner: string
  reason: string
  addedDate: string
  type: "stolen" | "wanted" | "escaped"
}