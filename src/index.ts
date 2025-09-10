import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = 3000;

// Root route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World ");
});



// Middleware för att kunna läsa JSON i request body
app.use(express.json());

// Root route
app.get("/", (_req: Request, res: Response) => {
    res.send("Hello World from Express + TypeScript!");
});

// Health-check route
app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
});

// Echo route (tar emot JSON och returnerar samma tillbaka)
app.post("/echo", (req: Request, res: Response) => {
    res.json({ youSent: req.body });
});

// User route med path parameter
app.get("/users/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({ userId: id });
});

// 404 handler (läggs sist)
app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Not Found" });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});