import { Mongoose } from './model/mongoose';
import { json, urlencoded } from 'body-parser';
import { EmployeesRoutes } from './routes/employees.route';
import { CommonRoutes } from './routes/common.route';
import express from 'express';

class App {
  private app: express.Application;

  protected commonRoutes: CommonRoutes;
  protected employeeRoutes: EmployeesRoutes;

  constructor() {
    this.commonRoutes = new CommonRoutes();
    this.employeeRoutes = new EmployeesRoutes();
    this.app = express();
    this.configApp();
    this.configMongoose();
    this.configRoutes();
  }

  getApp(): express.Application {
    return this.app;
  }

  protected configApp(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
  }

  protected configRoutes(): void {
    this.configCommonRoutes();
    this.configEmployeeRoutes();
  }

  protected configCommonRoutes(): void {
    this.commonRoutes.route(this.app);
  }

  protected configEmployeeRoutes(): void {
    this.employeeRoutes.route(this.app);
  }

  protected configMongoose(): void {
    const mongo = new Mongoose();
    mongo.mongoSetup();
  }
}

export default new App().getApp();
