import "dotenv/config"
import { MongoClient } from "mongodb"
const uri = process.env.DB_CONNECTION_STRING
const dbName = process.env.DB_NAME || "sample_mflix"
const c = new MongoClient(uri)
await c.connect()
const db = c.db(dbName)
const colls = await db.listCollections().toArray()
const count = await db.collection("movies").countDocuments()
console.log({ db: db.databaseName, collections: colls.map(x=>x.name), moviesCount: count })
await c.close()
