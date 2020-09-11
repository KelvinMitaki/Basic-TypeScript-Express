import { Request, Response } from "express";
import { get, post } from "./decorators/routes";
import { controller } from "./decorators/controllers";
import { bodyValidator } from "./decorators/bodyValidator";

@controller("/auth")
export class LoginController {
  @get("/login")
  getLogin(req: Request, res: Response): void {
    if (req.session && req.session.isLoggedIn) {
      res.redirect("/");
      return;
    }
    res.send(`
        <form method="post">
          <label for="email">Email</label>
          <input type="text" name="email" id="email" />
          <label for="password">Password</label>
          <input type="password" name="password" id="password" />
          <button type="submit">Submit</button>
      </form>
            `);
  }
  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;

    if (email && password && email === "test@test.com" && password === "test") {
      req.session = { isLoggedIn: true };
      res.redirect("/");
      return;
    }
    res.send("invalid email or password");
  }
  @get("/logout")
  getLogout(req: Request, res: Response): void {
    if (!req.session || (req.session && !req.session.isLoggedIn)) {
      res.redirect("/");
      return;
    }
    req.session = null;
    res.redirect("/");
  }
}
