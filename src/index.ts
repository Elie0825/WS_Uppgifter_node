import "dotenv/config"
import express from "express"
import { runDB, getDB, closeDB } from "./db/database"

const app = express()
const port = Number(process.env.PORT) || 3000

;(async () => {
  await runDB()

  app.get("/", (_, res) => res.json({ ok: true }))
  app.get("/health", (_, res) => res.send("ok"))
  app.get("/movies", async (req, res) => {
    try {
      const limit = Number(req.query.limit ?? 5)
      const movies = await getDB().collection("movies").find({}).limit(limit).toArray()
      res.json({ count: movies.length, movies })
    } catch (e) { res.status(500).json({ error: String(e) }) }
  })

  app.listen(port, "0.0.0.0", () => console.log(`Listening on ${port}`))
})()

process.on("SIGINT", async () => { await closeDB(); process.exit(0) })


// överst, efter express():
app.use(express.json())

// Uppgift 4: dynamisk parameter
app.get("/echo/:id", (req, res) => {
  const id = req.params.id
  res.json({ id })
})

// Uppgift 5: validering + return
app.get("/number/:id", (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) { res.status(400).send("Not a number"); return }
  res.json({ id })
})

// Uppgift 6: POST som skapar User och returnerar 201
app.post("/users", (_req, res) => {
  const user = { id: crypto.randomUUID(), name: "Alice" }
  res.status(201).json(user)
})
