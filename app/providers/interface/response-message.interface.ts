import { Response } from 'express';

export interface IResponseMessage {
  res: Response;
  data?: any;
  message?: string;
  err?: any;
  meta?: any
}