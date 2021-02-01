import { Mongoose } from './model/mongoose';
import { json, urlencoded } from 'body-parser';
import passport from 'passport';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passportStrategyConfig from './middlewares/passport.middleware'
import { AuthRoutes, EmployeeRoutes, UploadFileRoutes } from './routes';
import { SERVER_CONFIG } from './providers/config/ts/server-config';
class App {
  private _app: Application;

  protected employeeRoutes: EmployeeRoutes;
  protected authRoutes: AuthRoutes;
  protected mongoose: Mongoose;
  protected uploadFileRoutes: UploadFileRoutes;


  constructor() {
    this._app = express();
    this.initRouter();
    this.initMongoose();
    this.configApp();
    this.configMongoose();
    this.configRoutes();
  }

  protected initRouter(): void {
    this.employeeRoutes = new EmployeeRoutes();
    this.authRoutes = new AuthRoutes();
    this.uploadFileRoutes = new UploadFileRoutes()
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
    this._app.use(express.static(SERVER_CONFIG.UPLOADS_FOLDER_URL));
  }

  protected configRoutes(): void {
    this.employeeRoutes.route(this._app);
    this.authRoutes.route(this._app);
    this.uploadFileRoutes.route(this._app);
  }

  protected configMongoose(): void {
    this.mongoose.mongoSetup();
  }
}

export default new App().app;
