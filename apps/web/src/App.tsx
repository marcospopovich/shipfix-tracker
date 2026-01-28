import { Routes, Route } from "react-router-dom"
import { Layout } from "@/Layout"
import { Dashboard } from "@/pages/Dashboard"
import { Buques } from "@/pages/Buques"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/buques" element={<Buques />} />
      </Routes>
    </Layout>
  )
}
