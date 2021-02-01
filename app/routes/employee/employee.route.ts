import { EmployeeController } from "../../controllers";
import { Application, Request, Response } from "express";
import passport from 'passport';
import { checkDuplicateEmail } from "../../shared/validators/check-dulicate-email.validator";
import { BaseRoutes } from "../base.route";
import { upload } from '../../middlewares/multer.middleware';


export class EmployeeRoutes extends BaseRoutes {
  protected EmployeeController: EmployeeController;
  
  constructor() {
    super();
    this.EmployeeController = new EmployeeController();
  }

  public route(app: Application) {
    app.post(
      '/employees',
      [
        checkDuplicateEmail, 
        passport.authenticate('jwt', { session: false }),
        upload.single('image')
      ],
      async (req: Request, res: Response) => {
        this.EmployeeController.createEmployee(req, res);
      }
    );

    app.get(
      '/employees/:id',
      [passport.authenticate('jwt', { session: false })],
      (req: Request, res: Response) => {
        console.log('Do something');
      }
    );

    app.put(
      '/employees/:id', 
      [passport.authenticate('jwt', { session: false })],
      (req: Request, res: Response) => {
        this.EmployeeController.updateEmployee(req, res);
      }
    );

    app.delete('/employees/:id', (req: Request, res: Response) => {
      this.EmployeeController.deleteEmployeeById(req, res);
    });

    app.get('/employees', (req: Request, res: Response) => {
      this.EmployeeController.getFilteredEmployees(req, res);
    });
  }
}