import "reflect-metadata";
import { Methods } from "./Methods";

const routeBinder = (method: string) => (path: string) => (
  target: any,
  key: string,
  desc: PropertyDescriptor
) => {
  Reflect.defineMetadata("path", path, target, key);
  Reflect.defineMetadata("method", method, target, key);
};

export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const patch = routeBinder(Methods.patch);
export const del = routeBinder(Methods.delete);
export const post = routeBinder(Methods.post);
