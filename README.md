# ShipFix Tracker ⚓

**ShipFix Tracker** es un sistema de gestión de mantenimiento y reparaciones para flotas marítimas (especialmente pesqueras), orientado a registrar buques, equipos, fallas y órdenes de trabajo, con foco en trazabilidad técnica, criticidad operativa y mantenimiento preventivo.

Este repositorio contiene el **MVP** del proyecto, desarrollado con una arquitectura moderna Full-Stack.

---

## 🎯 Objetivo del Proyecto

Centralizar y profesionalizar la gestión de:

- Flota de buques
- Inventario de equipos técnicos
- Registro de fallas
- Órdenes de trabajo (OT)
- Mantenimiento preventivo
- Visibilidad operativa para técnicos y responsables

Pensado para crecer hacia:
- Reportes
- Alertas
- Historial técnico por buque
- Integración futura con sensores / IoT

---

## 🧱 Stack Tecnológico

### Frontend
- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **TanStack Query (React Query)**
- **Lucide React (iconos)**
- **shadcn/ui** (tablas, formularios, modales)

### Backend (en planificación)
- Node.js (Express o NestJS)
- PostgreSQL
- Prisma ORM
- Autenticación JWT

---

## 📁 Estructura del Proyecto (Frontend)

```txt
src/
 ├── api/                # Lógica de acceso a datos (fetch / axios)
 ├── components/         # Componentes reutilizables (UI)
 ├── features/           # Módulos por dominio (buques, equipos, etc.)
 │    └── vessels/
 │         ├── VesselList.tsx
 │         ├── VesselForm.tsx
 │         ├── VesselModal.tsx
 │         └── vessel.types.ts
 ├── layouts/            # Layouts generales (Sidebar, MainLayout)
 ├── pages/              # Vistas principales
 ├── routes/             # Definición de rutas
 ├── styles/             # Estilos globales
 ├── utils/              # Helpers y utilidades
 └── main.tsx
