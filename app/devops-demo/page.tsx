const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"

async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`, { cache: "no-store" })
    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` }
    }
    const data = await res.json()
    return { ok: true, data }
  } catch (err) {
    return { ok: false, error: "Request failed" }
  }
}

export default async function DevopsDemoPage() {
  const result = await fetchHealth()

  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-4">DevOps Demo: Frontend → Backend → Database</h1>
      <p className="text-muted-foreground mb-8">
        This page calls a separate Express backend service, which in turn queries the Postgres
        database defined in docker-compose.
      </p>

      <div className="rounded-2xl border bg-background/60 p-6 font-mono text-sm overflow-x-auto">
        {result.ok ? (
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        ) : (
          <div>
            <p className="text-red-500 font-semibold mb-2">Request failed</p>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  )
}
