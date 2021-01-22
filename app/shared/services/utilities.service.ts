import { v4 as uuidv4 } from 'uuid';

export function getUUID() {
  return uuidv4();
}

export function hasEnoughParams<T>(data: T | any, requiredParams: string[]): boolean {
  if (!requiredParams?.length || !data) { return false; }

  return requiredParams.every(param => data[param]);
}

export function RequiredParams() {
  return function (target: any, propertyKey: string) {
    target.constructor.propertyKeys = target.constructor.propertyKeys ?? [];
    target.constructor.propertyKeys.push(propertyKey)
  }
}
