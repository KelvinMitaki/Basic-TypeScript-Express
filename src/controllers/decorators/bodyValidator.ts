import { Metadata } from "./Metadata";

export const bodyValidator = (...keys: string[]) => (
  target: any,
  key: string,
  desc: PropertyDescriptor
) => {
  Reflect.defineMetadata(Metadata.validator, keys, target, key);
};
