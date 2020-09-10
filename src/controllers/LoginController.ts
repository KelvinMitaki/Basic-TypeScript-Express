import { Request, Response } from "express";

export class LoginController {
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
}
