import { useState } from "react"
import {
  Activity,
  Anchor,
  ClipboardList,
  LayoutGrid,
  LifeBuoy,
  LineChart,
  Settings,
} from "lucide-react"

const navItems = [
  { label: "Panel", icon: LayoutGrid },
  { label: "Buques", icon: Anchor },
  { label: "Equipos", icon: Settings },
  { label: "Fallas y OT", icon: Activity },
  { label: "Mantenimientos", icon: ClipboardList },
  { label: "Informes", icon: LineChart },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`min-h-screen border-r bg-white p-4 transition-all ${collapsed ? "w-20" : "w-64"}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-lg font-bold text-[#1e40af]">
          <LifeBuoy className="h-5 w-5" />
          {!collapsed && <span>ShipFix Tracker</span>}
        </div>
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      <nav className="mt-6 space-y-1 text-sm text-gray-700">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-md px-3 py-2 transition hover:bg-blue-50 hover:text-[#1e40af]"
          >
            <item.icon className="h-4 w-4" />
            {!collapsed && <span>{item.label}</span>}
          </div>
        ))}
      </nav>
    </aside>
  )
}
