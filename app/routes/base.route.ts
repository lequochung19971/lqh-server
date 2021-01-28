import { Application } from "express";

export abstract class BaseRoutes {
  abstract route(app: Application): void;
}