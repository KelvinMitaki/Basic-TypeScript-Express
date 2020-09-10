import { Router, Request, Response } from "express";

const route = Router();

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

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

route.post("/login", (req: RequestWithBody, res: Response): void => {
  const { email, password } = req.body;
  if (email && password && email === "test@test.com" && password === "test") {
    req.session = { isLoggedIn: true };
    res.send(email + password);
    return;
  }
  res.send("invalid email or password");
});
export default route;
