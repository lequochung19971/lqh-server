import { Mongoose } from './model/mongoose';
import { json, urlencoded } from 'body-parser';
import { EmployeesRoutes } from './routes/employees.route';
import { CommonRoutes } from './routes/common.route';
import passport from 'passport';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passportStrategyConfig from './middlewares/passport.middleware'
class App {
  private _app: Application;

  protected commonRoutes: CommonRoutes;
  protected employeeRoutes: EmployeesRoutes;

  constructor() {
    this.commonRoutes = new CommonRoutes();
    this.employeeRoutes = new EmployeesRoutes();
    this._app = express();
    this.configApp();
    this.configMongoose();
    this.configRoutes();
  }

  get app(): Application {
    return this._app;
  }

  protected configApp(): void {
    this._app.use(json());
    this._app.use(urlencoded({ extended: false }));
    this._app.use(cors());
    this._app.use(passport.initialize());
    this._app.use(morgan('dev'))
    passport.use(passportStrategyConfig)
  }

  protected configRoutes(): void {
    this.configCommonRoutes();
    this.configEmployeeRoutes();
  }

  protected configCommonRoutes(): void {
    this.commonRoutes.route(this._app);
  }

  protected configEmployeeRoutes(): void {
    this.employeeRoutes.route(this._app);
  }

  protected configMongoose(): void {
    const mongo = new Mongoose();
    mongo.mongoSetup();
  }
}

export default new App().app;
