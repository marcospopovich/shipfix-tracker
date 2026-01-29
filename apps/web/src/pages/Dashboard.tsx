import {
  AlertTriangle,
  Anchor,
  CalendarClock,
  ClipboardList,
  Ship,
  Timer,
  Wrench,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const kpis = [
  {
    title: "Fallas abiertas",
    value: "12",
    trend: "+3 últimas 24h",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    title: "OT pendientes",
    value: "18",
    trend: "5 críticas",
    icon: ClipboardList,
    color: "text-orange-600",
  },
  {
    title: "Mantenimientos próximos",
    value: "9",
    trend: "7 días",
    icon: CalendarClock,
    color: "text-blue-700",
  },
  {
    title: "Buques operativos",
    value: "8 / 10",
    trend: "2 en puerto",
    icon: Ship,
    color: "text-emerald-600",
  },
]

const incidents = [
  {
    id: "INC-1021",
    vessel: "Aurora del Sur",
    equipment: "Radar Furuno 2139",
    severity: "Alta",
    status: "En diagnóstico",
    eta: "6h",
  },
  {
    id: "INC-1019",
    vessel: "Nanina",
    equipment: "Motor principal",
    severity: "Media",
    status: "En reparación",
    eta: "18h",
  },
  {
    id: "INC-1013",
    vessel: "Pacífica Austral",
    equipment: "Sistema hidráulico",
    severity: "Alta",
    status: "Abierta",
    eta: "12h",
  },
  {
    id: "INC-1007",
    vessel: "Tridente Magallánico",
    equipment: "Comunicaciones VHF",
    severity: "Baja",
    status: "En diagnóstico",
    eta: "24h",
  },
]

const maintenances = [
  {
    id: "MT-412",
    vessel: "Aurora del Sur",
    task: "Cambio de filtros de combustible",
    due: "15 Sep 2024",
    status: "Programado",
  },
  {
    id: "MT-406",
    vessel: "Nanina",
    task: "Inspección de generadores",
    due: "17 Sep 2024",
    status: "En curso",
  },
  {
    id: "MT-398",
    vessel: "Pacífica Austral",
    task: "Calibración de sonda",
    due: "19 Sep 2024",
    status: "Programado",
  },
]

const workOrders = [
  {
    id: "OT-553",
    vessel: "Aurora del Sur",
    owner: "Equipo técnico Norte",
    progress: "75%",
    status: "En reparación",
  },
  {
    id: "OT-541",
    vessel: "Nanina",
    owner: "Taller Puerto Base",
    progress: "40%",
    status: "Diagnóstico",
  },
  {
    id: "OT-530",
    vessel: "Pacífica Austral",
    owner: "Proveedor externo",
    progress: "15%",
    status: "Pendiente",
  },
]

function SeverityBadge({ value }: { value: string }) {
  const styles =
    value === "Alta"
      ? "border-red-200 bg-red-50 text-red-700"
      : value === "Media"
      ? "border-orange-200 bg-orange-50 text-orange-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700"

  return <Badge className={styles}>{value}</Badge>
}

function StatusBadge({ value }: { value: string }) {
  const styles =
    value === "En reparación"
      ? "border-orange-200 bg-orange-50 text-orange-700"
      : value === "En diagnóstico"
      ? "border-blue-200 bg-blue-50 text-blue-700"
      : value === "Programado"
      ? "border-sky-200 bg-sky-50 text-sky-700"
      : value === "En curso"
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700"

  return <Badge className={styles}>{value}</Badge>
}

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Panel de Control</p>
          <h1 className="text-2xl font-semibold text-gray-900">Resumen Operativo de Flota</h1>
          <p className="text-sm text-muted-foreground">
            KPIs críticos, fallas activas y mantenimientos próximos por buque.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button className="border-transparent bg-[#1e40af] text-white hover:bg-[#1e3a8a]">
            <Wrench className="mr-2 h-4 w-4" />
            Nueva OT
          </Button>
          <Button className="border-transparent bg-white text-gray-700">
            <Anchor className="mr-2 h-4 w-4 text-[#1e40af]" />
            Registrar falla
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{kpi.title}</CardTitle>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
              <CardDescription>Indicador en tiempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-gray-900">{kpi.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle>Fallas críticas y en curso</CardTitle>
                <CardDescription>Incidentes activos por equipo y buque</CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Input placeholder="Buscar por buque o equipo..." className="w-60" />
                <select className="h-10 rounded-md border px-3 text-sm focus:ring-2 focus:ring-blue-200">
                  <option>Todos los estados</option>
                  <option>Abierta</option>
                  <option>En diagnóstico</option>
                  <option>En reparación</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Buque</TableHead>
                    <TableHead>Equipo</TableHead>
                    <TableHead>Criticidad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>ETA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.map((incident) => (
                    <TableRow key={incident.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-[#1e40af]">{incident.id}</TableCell>
                      <TableCell>{incident.vessel}</TableCell>
                      <TableCell>{incident.equipment}</TableCell>
                      <TableCell>
                        <SeverityBadge value={incident.severity} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge value={incident.status} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Timer className="h-4 w-4 text-gray-400" />
                          {incident.eta}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Planificación de mantenimiento</CardTitle>
              <CardDescription>Próximos vencimientos preventivos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {maintenances.map((item) => (
                <div key={item.id} className="rounded-md border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.task}</p>
                      <p className="text-xs text-muted-foreground">{item.vessel}</p>
                    </div>
                    <StatusBadge value={item.status} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item.id}</span>
                    <span className="font-medium text-gray-700">{item.due}</span>
                  </div>
                </div>
              ))}
              <Button className="w-full border-dashed text-gray-700">Ver calendario completo</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Órdenes de trabajo activas</CardTitle>
              <CardDescription>Seguimiento por responsable</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {workOrders.map((order) => (
                <div key={order.id} className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{order.id}</p>
                    <StatusBadge value={order.status} />
                  </div>
                  <p className="text-xs text-muted-foreground">{order.vessel}</p>
                  <p className="mt-2 text-xs text-gray-600">Responsable: {order.owner}</p>
                  <div className="mt-2 h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-[#1e40af]"
                      style={{ width: order.progress }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Avance {order.progress}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
