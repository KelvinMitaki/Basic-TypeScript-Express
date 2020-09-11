import { RequestHandler } from "express";
import { Metadata } from "./Metadata";

export const use = (middleware: RequestHandler) => (
  target: any,
  key: string,
  desc: PropertyDescriptor
) => {
  const middlewares =
    Reflect.getMetadata(Metadata.middleware, target, key) || [];
  Reflect.defineMetadata(
    Metadata.middleware,
    [...middlewares, middleware],
    target,
    key
  );
};
