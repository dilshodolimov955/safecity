import { FileText, Download, Calendar, TrendingUp, TrendingDown } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { weeklyStats } from "../data/mock"

const monthlyData = [
  { month: "Avg", count: 45 },
  { month: "Sen", count: 52 },
  { month: "Okt", count: 38 },
  { month: "Noy", count: 61 },
  { month: "Dek", count: 55 },
  { month: "Yan", count: 42 },
]

const pieData = [
  { name: "O'g'irlangan", value: 42, color: "#ef4444" },
  { name: "Qidirilmoqda", value: 31, color: "#f59e0b" },
  { name: "Tezlik buzish", value: 18, color: "#3b82f6" },
  { name: "Boshqa", value: 9, color: "#9ca3af" },
]

const reportList = [
  { title: "Yanvar 2024 hisoboti", date: "2024-01-31", size: "2.4 MB" },
  { title: "Dekabr 2023 hisoboti", date: "2023-12-31", size: "3.1 MB" },
  { title: "Noyabr 2023 hisoboti", date: "2023-11-30", size: "2.8 MB" },
]

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-900">Hisobotlar</h1>
          <p className="text-sm text-gray-400">Tahlil va statistika</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download size={15} />
          PDF yuklab olish
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Bu oy</p>
          <p className="text-2xl font-medium text-gray-900">248</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
            <TrendingUp size={12} />
            <span>+12% o'tgan oyga</span>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">O'tgan oy</p>
          <p className="text-2xl font-medium text-gray-900">221</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-green-500">
            <TrendingDown size={12} />
            <span>-5% undan oldin</span>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Hal qilingan</p>
          <p className="text-2xl font-medium text-green-600">184</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
            <span>74% samaradorlik</span>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Jarimalar</p>
          <p className="text-2xl font-medium text-gray-900">63</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
            <span>Bu oy</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Monthly chart */}
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-800 mb-4">Oylik statistika</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyData} barSize={24}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ fontSize: 12, border: "none", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                cursor={{ fill: "#f3f4f6" }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-800 mb-4">Hodisa turlari</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={160}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs text-gray-500">{item.name}</span>
                  <span className="text-xs font-medium text-gray-800 ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Report files */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-800">Arxiv hisobotlar</p>
        </div>
        {reportList.map((r, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText size={15} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-800">{r.title}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={11} />
                  <span>{r.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{r.size}</span>
              <button className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700">
                <Download size={13} />
                Yuklab olish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}