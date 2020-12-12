import { v4 as uuidv4 } from 'uuid';

export function getUUID() {
  return uuidv4();
}

export function hasEnoughParams<T>(data: T | any, requiredParams: string[]): boolean {
  if (!requiredParams || requiredParams.length === 0 || !data) { return false; }

  return requiredParams.every(param => data[param]);
}