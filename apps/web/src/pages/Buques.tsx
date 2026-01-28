import { useMemo, useState } from "react"

type EstadoOperativo = "Operativo" | "En puerto" | "En reparación" | "Fuera de servicio"

type Buque = {
  id: string
  nombre: string
  matricula: string
  puertoBase: string
  estado: EstadoOperativo
  jefesTecnicos: string[] // 1 o 2
}

const BUQUES_SEED: Buque[] = [
  {
    id: "bq-1",
    nombre: "Aurora del Sur",
    matricula: "CHI-VAL-0921",
    puertoBase: "Valparaíso",
    estado: "Operativo",
    jefesTecnicos: ["Juan Pérez"],
  },
  {
    id: "bq-2",
    nombre: "Nanina",
    matricula: "ARG-MDP-1120",
    puertoBase: "Mar del Plata",
    estado: "Operativo",
    jefesTecnicos: ["Marcos Popovich", "Sofía Díaz"],
  },
  {
    id: "bq-3",
    nombre: "Pacífica Austral",
    matricula: "CHI-TAL-3310",
    puertoBase: "Talcahuano",
    estado: "En reparación",
    jefesTecnicos: ["Carla Rivas"],
  },
  {
    id: "bq-4",
    nombre: "Tridente Magallánico",
    matricula: "CHI-PMO-4478",
    puertoBase: "Punta Arenas",
    estado: "En puerto",
    jefesTecnicos: ["Diego Muñoz"],
  },
]

function EstadoPill({ estado }: { estado: EstadoOperativo }) {
  const cls =
    estado === "Operativo"
      ? "bg-green-100 text-green-800"
      : estado === "En reparación"
      ? "bg-orange-100 text-orange-800"
      : estado === "Fuera de servicio"
      ? "bg-red-100 text-red-800"
      : "bg-blue-100 text-blue-800"

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${cls}`}>
      {estado}
    </span>
  )
}

function uid() {
  return `bq-${Math.random().toString(16).slice(2)}-${Date.now()}`
}

type NewBuqueForm = {
  nombre: string
  matricula: string
  puertoBase: string
  estado: EstadoOperativo
  jefe1: string
  jefe2: string
}

const EMPTY_FORM: NewBuqueForm = {
  nombre: "",
  matricula: "",
  puertoBase: "",
  estado: "Operativo",
  jefe1: "",
  jefe2: "",
}

export function Buques() {
  // data
  const [buques, setBuques] = useState<Buque[]>(BUQUES_SEED)
  const [selectedId, setSelectedId] = useState<string>(BUQUES_SEED[0]?.id ?? "")

  // filtros
  const [q, setQ] = useState("")
  const [puerto, setPuerto] = useState("Todos")
  const [estado, setEstado] = useState<"Todos" | EstadoOperativo>("Todos")

  // modal create
 const [isCreateOpen, setIsCreateOpen] = useState(false)
const [isEditOpen, setIsEditOpen] = useState(false)
const [editId, setEditId] = useState<string>("")

const [form, setForm] = useState<NewBuqueForm>(EMPTY_FORM)
const [formError, setFormError] = useState<string>("")


  const puertos = useMemo(() => {
    const uniq = Array.from(new Set(buques.map((b) => b.puertoBase))).filter(Boolean)
    return ["Todos", ...uniq]
  }, [buques])

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()

    return buques.filter((b) => {
      const matchQ =
        !query ||
        b.nombre.toLowerCase().includes(query) ||
        b.matricula.toLowerCase().includes(query) ||
        b.jefesTecnicos.some((j) => j.toLowerCase().includes(query))

      const matchPuerto = puerto === "Todos" || b.puertoBase === puerto
      const matchEstado = estado === "Todos" || b.estado === estado

      return matchQ && matchPuerto && matchEstado
    })
  }, [q, puerto, estado, buques])

  const selected = useMemo(() => buques.find((b) => b.id === selectedId) ?? null, [selectedId, buques])

  function openCreate() {
    setForm(EMPTY_FORM)
    setFormError("")
    setIsCreateOpen(true)
  }

  function closeCreate() {
    setIsCreateOpen(false)
  }
  function openEdit(id: string) {
  const b = buques.find((x) => x.id === id)
  if (!b) return

  setEditId(id)
  setForm({
    nombre: b.nombre,
    matricula: b.matricula,
    puertoBase: b.puertoBase,
    estado: b.estado,
    jefe1: b.jefesTecnicos[0] ?? "",
    jefe2: b.jefesTecnicos[1] ?? "",
  })
  setFormError("")
  setIsEditOpen(true)
}

function closeEdit() {
  setIsEditOpen(false)
  setEditId("")
}

function validateEditBuque(f: NewBuqueForm, id: string): string {
  if (!f.nombre.trim()) return "Falta el nombre del buque."
  if (!f.matricula.trim()) return "Falta la matrícula."
  if (!f.puertoBase.trim()) return "Falta el puerto base."
  if (!f.jefe1.trim()) return "Debe cargar al menos 1 Jefe Técnico (Responsable)."

  const j1 = f.jefe1.trim()
  const j2 = f.jefe2.trim()
  if (j2 && j2.toLowerCase() === j1.toLowerCase()) return "El Jefe Técnico 2 no puede ser igual al 1."

  const count = [j1, j2].filter(Boolean).length
  if (count < 1 || count > 2) return "Debe haber 1 o 2 responsables."

  const exists = buques.some(
    (b) => b.id !== id && b.matricula.toLowerCase() === f.matricula.trim().toLowerCase()
  )
  if (exists) return "Ya existe otro buque con esa matrícula."

  return ""
}

function submitEdit() {
  const id = editId
  if (!id) return

  const err = validateEditBuque(form, id)
  if (err) {
    setFormError(err)
    return
  }

  const jefes = [form.jefe1.trim(), form.jefe2.trim()].filter(Boolean)

  setBuques((prev) =>
    prev.map((b) =>
      b.id === id
        ? {
            ...b,
            nombre: form.nombre.trim(),
            matricula: form.matricula.trim(),
            puertoBase: form.puertoBase.trim(),
            estado: form.estado,
            jefesTecnicos: jefes,
          }
        : b
    )
  )

  setSelectedId(id)
  closeEdit()
}


  function validateNewBuque(f: NewBuqueForm): string {
    if (!f.nombre.trim()) return "Falta el nombre del buque."
    if (!f.matricula.trim()) return "Falta la matrícula."
    if (!f.puertoBase.trim()) return "Falta el puerto base."
    if (!f.jefe1.trim()) return "Debe cargar al menos 1 Jefe Técnico (Responsable)."

    const j1 = f.jefe1.trim()
    const j2 = f.jefe2.trim()

    if (j2 && j2.toLowerCase() === j1.toLowerCase()) return "El Jefe Técnico 2 no puede ser igual al 1."

    // regla: 1 o 2
    const count = [j1, j2].filter(Boolean).length
    if (count < 1 || count > 2) return "Debe haber 1 o 2 responsables."

    // matrícula única (simple)
    const exists = buques.some((b) => b.matricula.toLowerCase() === f.matricula.trim().toLowerCase())
    if (exists) return "Ya existe un buque con esa matrícula."

    return ""
  }

  function submitCreate() {
    const err = validateNewBuque(form)
    if (err) {
      setFormError(err)
      return
    }

    const jefes = [form.jefe1.trim(), form.jefe2.trim()].filter(Boolean)
    const nuevo: Buque = {
      id: uid(),
      nombre: form.nombre.trim(),
      matricula: form.matricula.trim(),
      puertoBase: form.puertoBase.trim(),
      estado: form.estado,
      jefesTecnicos: jefes,
    }

    setBuques((prev) => [nuevo, ...prev])
    setSelectedId(nuevo.id)
    setIsCreateOpen(false)
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Gestión de Flota y Buques</h1>
          <p className="text-sm text-muted-foreground">
            Administre su flota pesquera, equipos y registros de mantenimiento
          </p>
        </div>

        <button
          onClick={openCreate}
          className="rounded-md bg-[#1e40af] px-4 py-2 text-sm font-medium text-white hover:opacity-95"
        >
          + Nuevo Buque
        </button>
      </div>

      {/* Filtros */}
      <div className="mt-6 rounded-lg border bg-white p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-7">
            <label className="mb-1 block text-xs text-muted-foreground">Buscar</label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Nombre, matrícula o jefe técnico..."
              className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-xs text-muted-foreground">Puerto Base</label>
            <select
              value={puerto}
              onChange={(e) => setPuerto(e.target.value)}
              className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            >
              {puertos.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-xs text-muted-foreground">Estado</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value as any)}
              className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="Todos">Todos</option>
              <option value="Operativo">Operativo</option>
              <option value="En puerto">En puerto</option>
              <option value="En reparación">En reparación</option>
              <option value="Fuera de servicio">Fuera de servicio</option>
            </select>
          </div>

          <div className="md:col-span-1 flex items-end">
            <button
              onClick={() => {
                setQ("")
                setPuerto("Todos")
                setEstado("Todos")
              }}
              className="h-10 w-full rounded-md border bg-white text-sm hover:bg-gray-50"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Layout 2 columnas */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Tabla */}
        <div className="lg:col-span-8 rounded-lg border bg-white">
          <div className="border-b px-4 py-3">
            <div className="text-sm font-semibold">Listado de Buques</div>
            <div className="text-xs text-muted-foreground">Click para ver contexto</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Nombre</th>
                  <th className="px-4 py-3 font-medium">Matrícula</th>
                  <th className="px-4 py-3 font-medium">Jefe Técnico</th>
                  <th className="px-4 py-3 font-medium">Puerto Base</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((b) => {
                  const isSelected = b.id === selectedId
                  return (
                    <tr
                      key={b.id}
                      onClick={() => setSelectedId(b.id)}
                      className={`cursor-pointer border-t hover:bg-gray-50 ${isSelected ? "bg-blue-50" : ""}`}
                    >
                      <td className="px-4 py-3 font-medium text-[#1e40af]">{b.nombre}</td>
                      <td className="px-4 py-3 text-gray-700">{b.matricula}</td>
                      <td className="px-4 py-3 text-gray-700">{b.jefesTecnicos.join(" / ")}</td>
                      <td className="px-4 py-3 text-gray-700">{b.puertoBase}</td>
                      <td className="px-4 py-3">
                        <EstadoPill estado={b.estado} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50">Ver</button>
                         <button
  className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
  onClick={(e) => {
    e.stopPropagation()
    openEdit(b.id)
  }}
>
  Editar
</button>

                          <button className="rounded-md border px-2 py-1 text-xs text-red-600 hover:bg-red-50">
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td className="px-4 py-10 text-center text-sm text-muted-foreground" colSpan={6}>
                      No hay resultados con esos filtros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contexto */}
        <div className="lg:col-span-4 rounded-lg border bg-white">
          <div className="border-b px-4 py-3">
            <div className="text-sm font-semibold">Contexto del Buque</div>
            <div className="text-xs text-muted-foreground">Información rápida</div>
          </div>

          <div className="p-4">
            {!selected ? (
              <div className="text-sm text-muted-foreground">Seleccione un buque…</div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold">{selected.nombre}</div>
                  <div className="text-xs text-muted-foreground">{selected.matricula}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-muted-foreground">Puerto Base</div>
                    <div className="mt-1 font-medium">{selected.puertoBase}</div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-muted-foreground">Estado</div>
                    <div className="mt-1">
                      <EstadoPill estado={selected.estado} />
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-3">
                  <div className="text-xs text-muted-foreground">Jefe Técnico (Responsable)</div>
                  <div className="mt-1 text-sm font-medium">{selected.jefesTecnicos.join(" / ")}</div>
                  <div className="mt-1 text-xs text-muted-foreground">Regla: 1 o 2 responsables</div>
                </div>

                <div className="rounded-md border p-3">
                  <div className="text-xs text-muted-foreground">KPIs (mock)</div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <div className="rounded-md bg-gray-50 p-2 text-center">
                      <div className="text-lg font-semibold text-red-600">0</div>
                      <div className="text-[10px] text-muted-foreground">Fallas Abiertas</div>
                    </div>
                    <div className="rounded-md bg-gray-50 p-2 text-center">
                      <div className="text-lg font-semibold text-orange-600">0</div>
                      <div className="text-[10px] text-muted-foreground">OT Pendientes</div>
                    </div>
                    <div className="rounded-md bg-gray-50 p-2 text-center">
                      <div className="text-lg font-semibold text-blue-700">0</div>
                      <div className="text-[10px] text-muted-foreground">Mant. Próximos</div>
                    </div>
                  </div>
                </div>

                <button className="w-full rounded-md bg-[#1e40af] px-4 py-2 text-sm font-medium text-white hover:opacity-95">
                  Ver detalle completo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Create */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={closeCreate} />
          <div className="absolute left-1/2 top-1/2 w-[min(640px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-lg">
            <div className="border-b px-5 py-4">
              <div className="text-sm font-semibold">Nuevo Buque</div>
              <div className="text-xs text-muted-foreground">Complete los datos del buque</div>
            </div>

            <div className="px-5 py-4">
              {formError && (
                <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {formError}
                </div>
              )}
              {isEditOpen && (
  <div className="fixed inset-0 z-50">
    <div className="absolute inset-0 bg-black/40" onClick={closeEdit} />
    <div className="absolute left-1/2 top-1/2 w-[min(640px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-lg">
      <div className="border-b px-5 py-4">
        <div className="text-sm font-semibold">Editar Buque</div>
        <div className="text-xs text-muted-foreground">Actualice los datos del buque</div>
      </div>

      <div className="px-5 py-4">
        {formError && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {formError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Nombre</label>
            <input
              value={form.nombre}
              onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
              className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Matrícula</label>
            <input
              value={form.matricula}
              onChange={(e) => setForm((p) => ({ ...p, matricula: e.target.value }))}
              className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Puerto Base</label>
            <input
              value={form.puertoBase}
              onChange={(e) => setForm((p) => ({ ...p, puertoBase: e.target.value }))}
              className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Estado</label>
            <select
              value={form.estado}
              onChange={(e) => setForm((p) => ({ ...p, estado: e.target.value as EstadoOperativo }))}
              className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="Operativo">Operativo</option>
              <option value="En puerto">En puerto</option>
              <option value="En reparación">En reparación</option>
              <option value="Fuera de servicio">Fuera de servicio</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Jefe Técnico 1 (obligatorio)</label>
            <input
              value={form.jefe1}
              onChange={(e) => setForm((p) => ({ ...p, jefe1: e.target.value }))}
              className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Jefe Técnico 2 (opcional)</label>
            <input
              value={form.jefe2}
              onChange={(e) => setForm((p) => ({ ...p, jefe2: e.target.value }))}
              className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 border-t px-5 py-4">
        <button onClick={closeEdit} className="h-10 rounded-md border bg-white px-4 text-sm hover:bg-gray-50">
          Cancelar
        </button>
        <button
          onClick={submitEdit}
          className="h-10 rounded-md bg-[#1e40af] px-4 text-sm font-medium text-white hover:opacity-95"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>
)}


              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Nombre</label>
                  <input
                    value={form.nombre}
                    onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
                    className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Ej: Stella Maris I"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Matrícula</label>
                  <input
                    value={form.matricula}
                    onChange={(e) => setForm((p) => ({ ...p, matricula: e.target.value }))}
                    className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Ej: ARG-MDP-1234"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Puerto Base</label>
                  <input
                    value={form.puertoBase}
                    onChange={(e) => setForm((p) => ({ ...p, puertoBase: e.target.value }))}
                    className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Ej: Mar del Plata"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Estado</label>
                  <select
                    value={form.estado}
                    onChange={(e) => setForm((p) => ({ ...p, estado: e.target.value as EstadoOperativo }))}
                    className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="Operativo">Operativo</option>
                    <option value="En puerto">En puerto</option>
                    <option value="En reparación">En reparación</option>
                    <option value="Fuera de servicio">Fuera de servicio</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Jefe Técnico 1 (obligatorio)</label>
                  <input
                    value={form.jefe1}
                    onChange={(e) => setForm((p) => ({ ...p, jefe1: e.target.value }))}
                    className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Nombre y apellido"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Jefe Técnico 2 (opcional)</label>
                  <input
                    value={form.jefe2}
                    onChange={(e) => setForm((p) => ({ ...p, jefe2: e.target.value }))}
                    className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Nombre y apellido"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t px-5 py-4">
              <button onClick={closeCreate} className="h-10 rounded-md border bg-white px-4 text-sm hover:bg-gray-50">
                Cancelar
              </button>
              <button
                onClick={submitCreate}
                className="h-10 rounded-md bg-[#1e40af] px-4 text-sm font-medium text-white hover:opacity-95"
              >
                Guardar Buque
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
