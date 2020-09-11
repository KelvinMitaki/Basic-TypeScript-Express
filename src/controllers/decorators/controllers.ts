import { Router } from "express";
import { AppRouter } from "../../AppRouter";
import { Metadata } from "./Metadata";
import { Methods } from "./Methods";

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
    const middlewares = Reflect.getMetadata(
      Metadata.middleware,
      target.prototype,
      key
    );
    router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
  }
};
