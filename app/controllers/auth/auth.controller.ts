import { Request, Response } from 'express';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { BaseController } from '../base.controller';
import { EmployeeSerivce } from '../../model/employee/employee.service';
import { Tokens } from '../../providers/interface/tokens.interface';
import { RefreshTokenService } from '../../model/auth/refresh-token.service';
import { IEmployeeDocument } from '../../model/employee/employee.schema';
import { SERVER_CONFIG } from '../../providers/config/ts/server-config';

export class AuthController extends BaseController {
  protected employeeService: EmployeeSerivce;
  protected refreshTokenService: RefreshTokenService;

  constructor() {
    super();
    this.employeeService = new EmployeeSerivce();
    this.refreshTokenService = new RefreshTokenService();
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