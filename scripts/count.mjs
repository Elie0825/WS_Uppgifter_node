import "dotenv/config"
import { MongoClient } from "mongodb"

const uri = process.env.DB_CONNECTION_STRING
const db = process.env.DB_NAME || "sample_mflix"

const c = new MongoClient(uri)
try {
  await c.connect()
  console.log(await c.db(db).collection("movies").countDocuments())
} finally { await c.close() }
