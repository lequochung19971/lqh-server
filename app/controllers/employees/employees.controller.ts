import { Request, Response } from 'express';
import { EmployeesSerivce } from '../../model/employees/employees.service';
import { Employee } from '../../providers/model/employee.model';
import { IModificationNote } from '../../providers/interface/modification-note.interface';
import { ResponseMessageService } from '../../shared/services/response-message.service';
import { IResponseMessage } from '../../providers/interface/response-message.interface';
import * as _ from 'lodash';
import { LoggerService } from '../../shared/services/logger.service';
import { SortType } from '../../providers/enum/sort-type.enum';
import { PasswordHasherService } from '../../shared/services/password-hasher.service';
import * as utilities from '../../shared/services/utilities.service';
import { EmployeeFE } from '../../providers/model/employee-FE.model';

export class EmployeesController {
  protected employeeService: EmployeesSerivce;
  protected responseMessageService: ResponseMessageService;
  protected logger: LoggerService;
  protected passwordHasherService: PasswordHasherService;

  constructor() {
    this.employeeService = new EmployeesSerivce();
    this.responseMessageService = new ResponseMessageService();
    this.logger = new LoggerService();
    this.passwordHasherService = new PasswordHasherService();
  }

  async createEmployee(req: Request, res: Response) {
    const modificationNote: IModificationNote = {
      modifiedOn: new Date(Date.now()),
      modifiedBy: null,
      description: 'Create new employee',
    };

    if (utilities.hasEnoughParams<Employee>(req.body, this.propertiesForCreating())) {
      const password = this.passwordHasherService.createNewHashingPassword(req.body.password);
      const body = { ...req.body, modificationNote, password } as Employee;
      const employee: Employee = new Employee(body);

      this.employeeService
        .createEmployee(employee)
        .then((data) => {
          const responseMess: IResponseMessage = { res, data: this.convertToDataFE(data), message: 'Create new employee' };
          this.responseMessageService.successReponse(responseMess);
        })
        .catch((err) => {
          if (err) {
            this.responseMessageService.mongoError({ res, err });
          }
        });
    } else {
      this.responseMessageService.insufficientParams({ res } as IResponseMessage);
    }
  }

  async updateEmployee(req: Request, res: Response) {
    const modificationNote: IModificationNote = {
      modifiedOn: new Date(Date.now()),
      modifiedBy: null,
      description: 'Update employee',
    };

    if (req.params.id && utilities.hasEnoughParams<Employee>(req.body, this.propertiesForCreating())) {
      const data = req.body as Employee;
      const employee: Employee = new Employee(data);
      
      employee._id = req.params.id;
      delete employee.password;

      this.employeeService
        .filterEmployee({ _id: employee._id }, 'modificationNote')
        .catch((err) => this.responseMessageService.mongoError({ res, err } as IResponseMessage))
        .then((dataFiltered) => {
          if ((dataFiltered as Employee) && dataFiltered.modificationNote) {
            employee.modificationNote = [...dataFiltered.modificationNote, modificationNote];
            this.employeeService
              .updateEmployee(employee as Employee)
              .catch((err) => this.responseMessageService.mongoError({ res, err }))
              .then((data) => {
                const responseMess: IResponseMessage = {
                  res,
                  data: this.convertToDataFE(data),
                  message: `Update employee: ${employee._id}`,
                };
                this.responseMessageService.successReponse(responseMess);
              });
          }
        });
    } else {
      this.responseMessageService.insufficientParams({ res } as IResponseMessage);
    }
  }

  async getEmployees(req: Request, res: Response) {
    const params = {};
    this.employeeService
      .getEmployees(params)
      .catch((err) => this.responseMessageService.mongoError({ res, err } as IResponseMessage))
      .then((data) => {
        const responseMess: IResponseMessage = { res, data: this.convertToDataFE(data), message: 'Get employees' };
        this.responseMessageService.successReponse(responseMess);
      });
  }

  async getFilteredEmployees(req: Request, res: Response) {
    const query = this.createFilterParams(req);
    this.employeeService
      .countEmployees({})
      .catch((err) => this.responseMessageService.mongoError({ res, err } as IResponseMessage))
      .then((length) => {
        if (length) {
          this.employeeService
            .getEmployees(query)
            .catch((err) =>
              this.responseMessageService.mongoError({ res, err } as IResponseMessage)
            )
            .then((data) => {
              const meta = { totalCount: length };
              const responseMess: IResponseMessage = { res, data: this.convertToDataFE(data), meta, message: 'Get employees' };
              this.responseMessageService.successReponse(responseMess);
            });
        }
      });
  }

  async deleteEmployee(req: Request, res: Response) {
    if (req.params.id) {
      this.employeeService
        .deleteEmployee(req.params.id)
        .catch((err) => this.responseMessageService.mongoError({ res, err } as IResponseMessage))
        .then((data) => {
          console.log(data);
          const responseMess: IResponseMessage = {
            res,
            data: this.convertToDataFE(data),
            message: `Delete employee: ${req.params.id}`,
          };
          this.responseMessageService.successReponse(responseMess);
        });
    } else {
      this.responseMessageService.insufficientParams({ res } as IResponseMessage);
    }
  }

  protected createFilterParams(req: Request) {
    let query = {};
    const { sort, order, page, limit, pageNum = +page, limitNum = +limit } = req.query;

    if (pageNum && limitNum) {
      query = { ...query, limit: limitNum, skip: ((pageNum as number) - 1) * (limitNum as number) };
    }

    if (sort && order) {
      const od = order === SortType.desc ? 1 : -1;
      query = { ...query, sort: { [sort as string]: od } };
    }

    return query;
  }

  protected propertiesForCreating(): string[] {
    return ['dob', 'age', 'fullName', 'email', 'phone', 'gender'];
  }

  protected propertiesForUpdating(): string[] {
    return ['dob', 'age', 'fullName', 'email', 'phone', 'gender'];
  }

  protected convertToDataFE(data: any): EmployeeFE | EmployeeFE[] {
    if (data && (Array.isArray(data) || data.length)) {
      return data.map(d => new EmployeeFE(d));
    }

    return new EmployeeFE(data)
  }
}
