import { Router, Request, Response } from "express";

const route = Router();

route.get("/login", (req: Request, res: Response): void => {
  res.send(`
  <form method="post">
    <label for="email">Email</label>
    <input type="text" name="email" id="email" />
    <label for="password">Password</label>
    <input type="password" name="password" id="password" />
    <button type="submit">Submit</button>
</form>
      `);
});

route.post("/login", (req: Request, res: Response): void => {
  const { email, password }: { email: string; password: string } = req.body;
  res.send(email + password);
});
export default route;
