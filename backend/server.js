const express = require("express")
const { Pool } = require("pg")

const app = express()
const port = process.env.PORT || 4000

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.warn("DATABASE_URL is not set. Backend will start but DB routes will fail.")
}

const pool = connectionString
  ? new Pool({ connectionString })
  : null

app.get("/api/health", async (req, res) => {
  try {
    if (!pool) {
      return res.status(500).json({ status: "error", message: "DATABASE_URL not configured" })
    }

    const result = await pool.query("SELECT NOW() as now")
    res.json({ status: "ok", dbTime: result.rows[0].now })
  } catch (err) {
    console.error("/api/health error", err)
    res.status(500).json({ status: "error", message: "Database query failed" })
  }
})

app.get("/api/ping", (req, res) => {
  res.json({ status: "ok", message: "Backend is reachable" })
})

app.listen(port, () => {
  console.log(`Backend API listening on port ${port}`)
})
