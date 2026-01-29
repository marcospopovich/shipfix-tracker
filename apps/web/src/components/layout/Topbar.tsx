import { Bell, Search } from "lucide-react"

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 text-sm">
      <div className="flex items-center gap-3 text-gray-700">
        <Search className="h-4 w-4 text-gray-400" />
        <span className="text-xs text-muted-foreground">Buscar buques, OT o fallas...</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative rounded-full border p-2 hover:bg-gray-50">
          <Bell className="h-4 w-4 text-gray-500" />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Operador</div>
          <div className="text-sm font-medium text-gray-900">Marina Valdés</div>
        </div>
      </div>
    </header>
  )
}
