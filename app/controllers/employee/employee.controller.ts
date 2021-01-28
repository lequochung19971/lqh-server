import { Request, Response } from 'express';
import _ from 'lodash';
import { EmployeeSerivce } from '../../model/employee/employee.service';
import { EmployeeModel } from '../../providers/model/employee.model';
import { IModificationNote } from '../../providers/interface/modification-note.interface';
import { IResponseMessage } from '../../providers/interface/response-message.interface';
import { SortType } from '../../providers/enum/sort-type.enum';
import { PasswordHasherService } from '../../shared/services/password-hasher.service';
import { EmployeeDTO } from '../../providers/dto/employee-dto.model';
import { employeeMapper } from '../../providers/mapper/employee.mapper';
import { IEmployeeDocument } from '../../model/employee/employee.schema';
import { RefreshTokenService } from '../../model/auth/refresh-token.service';
import { BaseController } from '../base.controller';

export class EmployeeController extends BaseController{
  protected employeeService: EmployeeSerivce;
  protected passwordHasherService: PasswordHasherService;
  protected refreshTokenService: RefreshTokenService;

  constructor() {
    super();
    this.employeeService = new EmployeeSerivce();
    this.passwordHasherService = new PasswordHasherService();
    this.refreshTokenService = new RefreshTokenService();
  }

  async createEmployee(req: Request, res: Response) {
    const modificationNote: IModificationNote = {
      modifiedOn: new Date(Date.now()),
      modifiedBy: null,
      description: 'Create new employee',
    };

    const employeeModel = employeeMapper.map(req.body, EmployeeModel, EmployeeDTO, {
      afterMap(_s, d) {
        d.modificationNote = [];
        d.modificationNote.push(modificationNote)
      },
    });

    if (employeeModel.hasEnoughParams) {
      try {
        const result = await this.employeeService.saveEmployee(employeeModel);
        const employeeDto = employeeMapper.map(result._doc, EmployeeDTO, EmployeeModel);
        const responseMess: IResponseMessage = {
          res,
          data: employeeDto,
          message: 'Create new employee'
        };
        return this.responseMessageService.successReponse(responseMess);
      } catch (err) {
        if (err) {
          this.responseMessageService.mongoError({ res, err });
        }
      }
    } 

    return this.responseMessageService.insufficientParams({ res });
  }

  async updateEmployee(req: Request, res: Response) {
    const modificationNote: IModificationNote = {
      modifiedOn: new Date(Date.now()),
      modifiedBy: null,
      description: 'Update employee',
    };

    const employeeModel = employeeMapper.map(req.body, EmployeeModel, EmployeeDTO);

    if (!req.params.id && !employeeModel.hasEnoughParams) {
      return this.responseMessageService.insufficientParams({ res });
    }

    employeeModel._id = req.params.id;
    let currentEmployee: object | undefined;
    try {
      const result = await this.employeeService.findEmployeeById(employeeModel._id);

      if (result.modificationNote?.length) {
        employeeModel.modificationNote = [...result.modificationNote, modificationNote];
        currentEmployee = _.pickBy(result._doc, (val, key) => {
          return key !== '__v' && val;
        })
      }
    } catch (err) {
      if (err) {
        return this.responseMessageService.mongoError({ res, err });
      }
    }

    if (currentEmployee) {
      try {
        const dataUpdating = {...employeeModel, ...currentEmployee};
        const result = await this.employeeService.updateEmployee(dataUpdating as EmployeeModel);

        const employeeDto = employeeMapper.map(result._doc, EmployeeDTO, EmployeeModel);
        const responseMess: IResponseMessage = {
          res,
          data: employeeDto,
          message: `Update employee: ${employeeModel._id}`,
        };
        return this.responseMessageService.successReponse(responseMess);

      } catch (err) {
        if (err) {
          return this.responseMessageService.mongoError({ res, err });
        }
      }
    }

    return this.responseMessageService.failureResponse({
      res,
      message: "Current employee does not exist!"
    })

  }

  async getFilteredEmployees(req: Request, res: Response) {
    let totalCount: number;
    try {
      totalCount = await this.employeeService.countEmployees({});
    } catch (err) {
      return this.responseMessageService.mongoError({ res, err })
    }

    const query = this.createFilterParams(req);

    try {
      const employees = await this.employeeService.findEmployees(query);
      const employeeDto = employees.map((employee: IEmployeeDocument) => {
        return employeeMapper.map(employee._doc, EmployeeDTO, EmployeeModel);
      })
      const meta = { totalCount };
      const responseMess: IResponseMessage = {
        res,
        data: employeeDto,
        meta,
        message: 'Get employees' };
      this.responseMessageService.successReponse(responseMess);
    } catch (err) {
      return this.responseMessageService.mongoError({ res, err })
    }
  }

  async deleteEmployeeById(req: Request, res: Response) {
    if (!req.params.id) {
      return this.responseMessageService.insufficientParams({res});
    }

    try {
      await this.employeeService.deleteEmployeeById(req.params.id);
      const responseMess: IResponseMessage = {
        res,
        data: null,
        message: `Deleted employee: ${req.params.id}`,
      };
      return this.responseMessageService.successReponse(responseMess);
    } catch (err) {
      return this.responseMessageService.mongoError({res, err});
    }
  }

  protected createFilterParams(req: Request) {
    let query = {};
    const { sort, order, page, limit, pageNum = +(page ?? 0), limitNum = +(limit ?? 0) } = req.query;

    if (pageNum && limitNum) {
      query = { ...query, limit: limitNum, skip: ((pageNum as number) - 1) * (limitNum as number) };
    }

    if (sort && order) {
      const od = order === SortType.desc ? 1 : -1;
      query = { ...query, sort: { [sort as string]: od } };
    }

    return query;
  }
}