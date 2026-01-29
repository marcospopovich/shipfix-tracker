import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "shipfix-api" })
})

app.get("/", (_req, res) => {
  res.json({
    name: "ShipFix Tracker API",
    version: "0.1.0",
    docs: "/health",
  })
})

const port = process.env.PORT ? Number(process.env.PORT) : 4000

app.listen(port, () => {
  console.log(`ShipFix API escuchando en :${port}`)
})
