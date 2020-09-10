import { Router } from "express";
import { AppRouter } from "../../AppRouter";

export const controller = (routePrefix: string) => (target: Function) => {
  const router = AppRouter.getInstance();
  for (let key in target.prototype) {
    const routeHandler = target.prototype[key];
    const path = Reflect.getMetadata("path", target.prototype, key);
    router.get(`${routePrefix}${path}`, routeHandler);
  }
};
