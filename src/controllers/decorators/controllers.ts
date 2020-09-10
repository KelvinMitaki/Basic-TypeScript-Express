import { Router } from "express";

export const controllerRouter = Router();

export const controller = (routePrefix: string) => (target: Function) => {
  for (let key in target.prototype) {
    const routeHandler = target.prototype[key];
    const path = Reflect.getMetadata("path", target.prototype, key);
    controllerRouter.get(`${routePrefix}${path}`, routeHandler);
  }
};
