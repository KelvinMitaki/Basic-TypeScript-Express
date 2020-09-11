import { RequestHandler } from "express";
import "reflect-metadata";
import { Metadata } from "./Metadata";
import { Methods } from "./Methods";

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

const routeBinder = (method: string) => (path: string) => (
  target: any,
  key: string,
  desc: RouteHandlerDescriptor
) => {
  Reflect.defineMetadata(Metadata.path, path, target, key);
  Reflect.defineMetadata(Metadata.method, method, target, key);
};

export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const patch = routeBinder(Methods.patch);
export const del = routeBinder(Methods.delete);
export const post = routeBinder(Methods.post);
