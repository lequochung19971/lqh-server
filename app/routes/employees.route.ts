import { EmployeesController } from "../controllers/employees/employees.controller";
import { Application, Request, Response } from "express";
import passport from 'passport';
import { checkDuplicateEmail } from "../shared/validators/check-dulicate-email.validator";


export class EmployeesRoutes {
  protected employeesController: EmployeesController;
  
  constructor() {
    this.employeesController = new EmployeesController();
  }

  public route(app: Application) {
    app.post(
      '/employees',
      [
        checkDuplicateEmail, 
        passport.authenticate('jwt', { session: false })
      ],
      async (req: Request, res: Response) => {
        this.employeesController.createEmployee(req, res);
      }
    );

    app.post('/auth/login', async (req: Request, res: Response) => {
      this.employeesController.login(req, res);
    });

    app.post('/auth/refresh', async (req: Request, res: Response) => {
      this.employeesController.doRefreshToken(req, res);
    });

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
        this.employeesController.updateEmployee(req, res);
      }
    );

    app.delete('/employees/:id', (req: Request, res: Response) => {
      this.employeesController.deleteEmployeeById(req, res);
    });

    app.get('/employees', (req: Request, res: Response) => {
      this.employeesController.getFilteredEmployees(req, res);
    });
  }
}