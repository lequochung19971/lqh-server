import { Request, Response } from 'express';
import * as _ from 'lodash';
import { EmployeesSerivce } from '../../model/employees/employees.service';
import { EmployeeModel } from '../../providers/model/employee.model';
import { IModificationNote } from '../../providers/interface/modification-note.interface';
import { ResponseMessageService } from '../../shared/services/response-message.service';
import { IResponseMessage } from '../../providers/interface/response-message.interface';
import { LoggerService } from '../../shared/services/logger.service';
import { SortType } from '../../providers/enum/sort-type.enum';
import { PasswordHasherService } from '../../shared/services/password-hasher.service';
import * as utilities from '../../shared/services/utilities.service';
import { EmployeeDTO } from '../../providers/dto/employee-dto.model';
import { employeeMapper } from '../../providers/mapper/employee.mapper';
import { getUUID } from '../../shared/services/utilities.service';

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

    const employeeModel = employeeMapper.map(req.body, EmployeeModel, EmployeeDTO, {
      afterMap(_s, d) {
        d.modificationNote = [];
        d.modificationNote.push(modificationNote)
      },
    });

    if (employeeModel.hasEnoughParams) {
      this.employeeService
        .createEmployee(employeeModel)
        .then((data) => {
          const employeeDto = employeeMapper.map(data._doc, EmployeeDTO, EmployeeModel);
          const responseMess: IResponseMessage = { 
            res, 
            data: employeeDto, 
            message: 'Create new employee' 
          };
          console.log(employeeDto);
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

    const employeeModel = employeeMapper.map(req.body, EmployeeModel, EmployeeDTO);
    if (req.params.id && employeeModel.hasEnoughParams) {
      employeeModel._id = req.params.id;

      const hasEmployee = await this.findEmployeeById(employeeModel._id)
        .catch((err) => this.responseMessageService.mongoError({ res, err } as IResponseMessage))
        .then((dataFiltered) => {
          if (dataFiltered?.modificationNote?.length) {
            employeeModel.modificationNote = [...dataFiltered.modificationNote, modificationNote];
            return true;
          }
          return false;
        })

      if (hasEmployee) {
        this.employeeService
          .updateEmployee(employeeModel as EmployeeModel)
          .catch((err) => this.responseMessageService.mongoError({ res, err }))
          .then((data) => {
            const employeeDto = employeeMapper.map(data._doc, EmployeeDTO, EmployeeModel);
            const responseMess: IResponseMessage = {
              res,
              data: employeeDto,
              message: `Update employee: ${employeeModel._id}`,
            };
            this.responseMessageService.successReponse(responseMess);
          });
      }
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
        const employeeDto = employeeMapper.map(data._doc, EmployeeDTO, EmployeeModel);
        const responseMess: IResponseMessage = { 
          res, 
          data: employeeDto, 
          message: 'Get employees' };
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
              const responseMess: IResponseMessage = { 
                res, 
                // data: this.convertToDataFE(data), 
                meta, 
                message: 'Get employees' };
              this.responseMessageService.successReponse(responseMess);
            });
        }
      });
  }

  async deleteEmployee(req: Request, res: Response) {
    if (req?.params?.id) {
      this.employeeService
        .deleteEmployee(req.params.id)
        .catch((err) => this.responseMessageService.mongoError({ res, err } as IResponseMessage))
        .then((_) => {
          const responseMess: IResponseMessage = {
            res,
            data: null,
            message: `Deleted employee: ${req.params.id}`,
          };
          this.responseMessageService.successReponse(responseMess);
        });
    } else {
      this.responseMessageService.insufficientParams({ res } as IResponseMessage);
    }
  }

  async findEmployeeById(_id: string): Promise<any> {
    return this.employeeService
      .filterEmployee({ _id })
      .catch((err) => err)
      .then((dataFiltered) => {
        return dataFiltered
      })
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
}