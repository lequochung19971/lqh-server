import { EmployeesController } from "../controllers/employees/employees.controller";
import { Application, Request, Response } from "express";


export class EmployeesRoutes {
  protected employeesController: EmployeesController;
  
  constructor() {
    this.employeesController = new EmployeesController;
  }

  public route(app: Application) {
    app.post('/employees', async (req: Request, res: Response) => {
      this.employeesController.createEmployee(req, res);
    });

    app.get('/employees/:id', (req: Request, res: Response) => {
    });

    app.put('/employees/:id', (req: Request, res: Response) => {
      this.employeesController.updateEmployee(req, res);
    });

    app.delete('/employees/:id', (req: Request, res: Response) => {
      this.employeesController.deleteEmployee(req, res);
    });

    app.get('/employees', (req: Request, res: Response) => {
      this.employeesController.getFilteredEmployees(req, res);
    });
  }
}