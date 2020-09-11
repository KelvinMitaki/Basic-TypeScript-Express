import { NextFunction, Request, Response } from "express";
import { controller } from "./decorators/controllers";
import { get } from "./decorators/routes";
import { use } from "./decorators/use";

const auth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.session || (req.session && !req.session.isLoggedIn)) {
    res.status(401).send("unauthorised");
    return;
  }
  next();
};

@controller("")
export class RootController {
  @get("/")
  getRoot(req: Request, res: Response): void {
    if (req.session && req.session.isLoggedIn) {
      res.send(`
              <div>
                  <div>You are logged in</div>
                  <a href="/auth/logout">Logout</a>
              </div>
      `);
      return;
    }
    res.send(`
          <div>
              <div>You are not logged in</div>
              <a href="/auth/login">Login</a>
          </div>
          
          `);
  }
  @get("/protected")
  @use(auth)
  getProtected(req: Request, res: Response): void {
    res.send(`
  <div>
      <div>Welcome to protected route logged in user</div>
  </div>
  `);
  }
}
