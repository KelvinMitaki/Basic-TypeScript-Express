import { NextFunction, Request, RequestHandler, Response } from "express";
import { AppRouter } from "../../AppRouter";
import { Metadata } from "./Metadata";
import { Methods } from "./Methods";

const bodyValidators = (keys: string[]): RequestHandler => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body) {
    res.status(422).send("no body");
    return;
  }

  for (let key of keys) {
    if (!req.body[key]) {
      console.log("reached");
      res.status(422).send("invalid request");
      return;
    }
  }
  next();
};

export const controller = (routePrefix: string) => (target: Function) => {
  const router = AppRouter.getInstance();
  for (let key in target.prototype) {
    const routeHandler = target.prototype[key];
    const path = Reflect.getMetadata(Metadata.path, target.prototype, key);
    const method: Methods = Reflect.getMetadata(
      Metadata.method,
      target.prototype,
      key
    );
    const middlewares =
      Reflect.getMetadata(Metadata.middleware, target.prototype, key) || [];
    const requiredBodyProps =
      Reflect.getMetadata(Metadata.validator, target.prototype, key) || [];

    router[method](
      `${routePrefix}${path}`,
      ...middlewares,
      bodyValidators(requiredBodyProps),
      routeHandler
    );
  }
};
