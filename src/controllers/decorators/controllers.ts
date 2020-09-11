import { Router } from "express";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";

export const controller = (routePrefix: string) => (target: Function) => {
  const router = AppRouter.getInstance();
  for (let key in target.prototype) {
    const routeHandler = target.prototype[key];
    const path = Reflect.getMetadata("path", target.prototype, key);
    const method: Methods = Reflect.getMetadata(
      "method",
      target.prototype,
      key
    );
    router[method](`${routePrefix}${path}`, routeHandler);
  }
};
