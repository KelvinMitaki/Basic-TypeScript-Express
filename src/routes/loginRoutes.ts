import { Router, Request, Response } from "express";
import auth from "../middlewares/auth";

const route = Router();

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

route.post("/login", (req: RequestWithBody, res: Response): void => {
  const { email, password } = req.body;

  if (email && password && email === "test@test.com" && password === "test") {
    req.session = { isLoggedIn: true };
    res.redirect("/");
    return;
  }
  res.send("invalid email or password");
});

route.get("/", (req: Request, res: Response): void => {
  if (req.session && req.session.isLoggedIn) {
    res.send(`
        <div>
            <div>You are logged in</div>
            <a href="/logout">Logout</a>
        </div>
`);
    return;
  }
  res.send(`
    <div>
        <div>You are not logged in</div>
        <a href="/login">Login</a>
    </div>
    
    `);
});

route.get("/logout", (req: Request, res: Response): void => {
  if (!req.session || (req.session && !req.session.isLoggedIn)) {
    res.redirect("/");
    return;
  }
  req.session = null;
  res.redirect("/");
});

route.get("/protected", auth, (req: Request, res: Response): void => {
  res.send(`
<div>
    <div>Welcome to protected route logged in user</div>
</div>
`);
});
export default route;
