import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction): void => {
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
