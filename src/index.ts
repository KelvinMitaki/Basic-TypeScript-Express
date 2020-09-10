import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response): void => {
  res.send(`
    <div>
        hello
    </div>
    `);
});
app.listen(3000, (): void => console.log("server started on port 3000"));
