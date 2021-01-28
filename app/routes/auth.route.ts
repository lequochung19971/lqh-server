import { Application, Request, Response } from "express";
import { BaseRoutes } from "./base.route";
import { AuthController } from "../controllers/auth/auth.controller";


export class AuthRoutes extends BaseRoutes {
  protected authController: AuthController;  
  constructor() {
    super();
    this.authController = new AuthController();
  }

  public route(app: Application) {
    app.post('/auth/login', async (req: Request, res: Response) => {
      this.authController.login(req, res);
    });

    app.post('/auth/refresh', async (req: Request, res: Response) => {
      this.authController.doRefreshToken(req, res);
    });

    app.post('/auth/logout', async (req: Request, res: Response) => {
      this.authController.login(req, res);
    });
  }
}