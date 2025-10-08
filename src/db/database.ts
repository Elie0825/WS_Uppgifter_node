import { Db, MongoClient } from "mongodb"

const uri = process.env.DB_CONNECTION_STRING!
const dbName = process.env.DB_NAME!
const client = new MongoClient(uri)
let connected = false

export async function runDB() {
  if (connected) return
  await client.connect()
  connected = true
  console.log("Db up")
}

export function getDB(): Db {
  if (!connected) throw new Error("DB not connected")
  return client.db(dbName)
}

export async function closeDB() {
  await client.close()
  connected = false
  console.log("Db closed")
}
