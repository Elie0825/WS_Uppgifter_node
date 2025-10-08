"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDB = runDB;
exports.getDB = getDB;
exports.closeDB = closeDB;
const mongodb_1 = require("mongodb");
const uri = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;
const client = new mongodb_1.MongoClient(uri);
let connected = false;
async function runDB() {
    if (connected)
        return;
    await client.connect();
    connected = true;
    console.log("Db up");
}
function getDB() {
    if (!connected)
        throw new Error("DB not connected");
    return client.db(dbName);
}
async function closeDB() {
    await client.close();
    connected = false;
    console.log("Db closed");
}
//# sourceMappingURL=database.js.map