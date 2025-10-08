import "dotenv/config"
import { MongoClient } from "mongodb"

const uri = process.env.DB_CONNECTION_STRING
if (!uri) { console.error("Missing DB_CONNECTION_STRING"); process.exit(1) }

const client = new MongoClient(uri)
try {
  await client.connect()
  await client.db("admin").command({ ping: 1 })
  console.log("OK: ping")
} catch (e) {
  console.error(e)
  process.exit(1)
} finally {
  await client.close()
}
