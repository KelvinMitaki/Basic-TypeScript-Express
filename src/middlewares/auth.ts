import { Request, Response } from "express";

export default (req: Request, res: Response, next: () => void): void => {
  if (!req.session || (req.session && !req.session.isLoggedIn)) {
    res.send(`
    <div>
        <div>Denied</div>
    </div>
    `);
    return;
  }
  next();
};
