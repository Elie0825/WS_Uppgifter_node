import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = 3000;

// Root route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World ");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
