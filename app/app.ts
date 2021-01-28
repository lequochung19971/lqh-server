import { Mongoose } from './model/mongoose';
import { json, urlencoded } from 'body-parser';
import { EmployeeRoutes } from './routes/employee.route';
import { CommonRoutes } from './routes/common.route';
import passport from 'passport';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passportStrategyConfig from './middlewares/passport.middleware'
import { AuthRoutes } from './routes/auth.route';
class App {
  private _app: Application;

  protected commonRoutes: CommonRoutes;
  protected employeeRoutes: EmployeeRoutes;
  protected authRoutes: AuthRoutes;
  protected mongoose: Mongoose;


  constructor() {
    this._app = express();
    this.initRouter();
    this.initMongoose();
    this.configApp();
    this.configMongoose();
    this.configRoutes();
  }

  protected initRouter(): void {
    this.commonRoutes = new CommonRoutes();
    this.employeeRoutes = new EmployeeRoutes();
    this.authRoutes = new AuthRoutes();
  }

  protected initMongoose(): void {
    this.mongoose = new Mongoose();
  }

  get app(): Application {
    return this._app;
  }

  protected configApp(): void {
    this._app.use(json());
    this._app.use(urlencoded({ extended: false }));
    this._app.use(cors());
    this._app.use(passport.initialize());
    passport.use(passportStrategyConfig);
    this._app.use(morgan('dev'));
  }

  protected configRoutes(): void {
    this.commonRoutes.route(this._app);
    this.employeeRoutes.route(this._app);
    this.authRoutes.route(this._app);
  }

  protected configMongoose(): void {
    this.mongoose.mongoSetup();
  }
}

export default new App().app;
