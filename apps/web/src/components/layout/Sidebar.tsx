export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <div className="font-bold text-lg mb-4">ShipFix Tracker</div>

      <nav className="space-y-2 text-sm">
        <div>Panel</div>
        <div>Buques</div>
        <div>Equipos</div>
        <div>Fallas y OT</div>
        <div>Mantenimientos</div>
        <div>Informes</div>
      </nav>
    </aside>
  )
}
