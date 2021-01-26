import { Request, Response } from 'express';
import _ from 'lodash';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { EmployeesSerivce } from '../../model/employees/employees.service';
import { EmployeeModel } from '../../providers/model/employee.model';
import { IModificationNote } from '../../providers/interface/modification-note.interface';
import { ResponseMessageService } from '../../shared/services/response-message.service';
import { IResponseMessage } from '../../providers/interface/response-message.interface';
import { LoggerService } from '../../shared/services/logger.service';
import { SortType } from '../../providers/enum/sort-type.enum';
import { PasswordHasherService } from '../../shared/services/password-hasher.service';
import { EmployeeDTO } from '../../providers/dto/employee-dto.model';
import { employeeMapper } from '../../providers/mapper/employee.mapper';
import { SERVER_CONFIG } from '../../providers/config/ts/server-config';
import { IEmployeeDocument } from '../../model/employees/employees.schema';
import { Tokens } from '../../providers/interface/tokens.interface';
import { RefreshTokenService } from '../../model/login/refresh-token.service';

export class EmployeesController {
  protected employeeService: EmployeesSerivce;
  protected responseMessageService: ResponseMessageService;
  protected logger: LoggerService;
  protected passwordHasherService: PasswordHasherService;
  protected refreshTokenService: RefreshTokenService;

  constructor() {
    this.employeeService = new EmployeesSerivce();
    this.responseMessageService = new ResponseMessageService();
    this.logger = new LoggerService();
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
    const query = this.createFilterParams(req);
    this.employeeService
      .countEmployees({})
      .catch((err) => this.responseMessageService.mongoError({ res, err }))
      .then((length) => {
        if (length) {
          this.employeeService
            .findEmployees(query)
            .catch((err) =>
              this.responseMessageService.mongoError({ res, err })
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

  async login(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      return this.responseMessageService.logginError({
        res,
        message: 'Please. Send your email and password',
      })
    }

    const employee = await this.employeeService.findEmployee({email: req.body.email});

    if (!employee) {
      return this.responseMessageService.logginError({
        res,
        message: 'The user does not exists',
      })
    }

    const isMatched = await employee.comparePassword(req.body.password);
    if (isMatched) {
      const tokens: Tokens = {
        jwtToken: this.createToken(employee),
        refreshToken: crypto.randomBytes(256).toString('hex')
      };

      this.refreshTokenService.saveRefreshToken({email: employee.email, token: tokens.refreshToken});
      
      return res.status(200).json(tokens);
    }

    return this.responseMessageService.logginError({
      res,
      message: 'Incorrect password',
    })
  }

  createToken(employee?: IEmployeeDocument): string {
    const payload =  { id: employee._id, email: employee.email }
    const secretOrPrivateKey: Secret = SERVER_CONFIG.JWT.SECRET_KEY;
    const signOptions: SignOptions = {
      expiresIn: SERVER_CONFIG.JWT.EXPIREDIN,
    };
    return jwt.sign(payload, secretOrPrivateKey, signOptions);
  }

  async doRefreshToken(req: Request, res: Response) {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      return this.responseMessageService.insufficientParams({res});
    }

    try {
      const currentRefreshToken = await this.refreshTokenService.findCurrentRefreshToken(refreshToken);
      const employee = await this.employeeService.findEmployee({email: currentRefreshToken.email});

      const tokens: Tokens = {
        jwtToken: this.createToken(employee),
        refreshToken: currentRefreshToken.token
      };

      res.status(200).json(tokens)
    } catch (error) {
      return this.responseMessageService.mongoError({res});
    }

  }
}