"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const database_1 = require("./db/database");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
(async () => {
    await (0, database_1.runDB)();
    app.get("/", (_, res) => res.json({ ok: true }));
    app.get("/health", (_, res) => res.send("ok"));
    app.get("/movies", async (req, res) => {
        try {
            const limit = Number(req.query.limit ?? 5);
            const movies = await (0, database_1.getDB)().collection("movies").find({}).limit(limit).toArray();
            res.json({ count: movies.length, movies });
        }
        catch (e) {
            res.status(500).json({ error: String(e) });
        }
    });
    app.listen(port, "0.0.0.0", () => console.log(`Listening on ${port}`));
})();
process.on("SIGINT", async () => { await (0, database_1.closeDB)(); process.exit(0); });
//# sourceMappingURL=index.js.map