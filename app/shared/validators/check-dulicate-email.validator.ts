import { Request, Response, NextFunction } from "express";
import { ResponseMessageService } from '../services/response-message.service';
import { EmployeesSerivce } from '../../model/employees/employees.service';

const responseMessageService = new ResponseMessageService();
const employeesSerivce = new EmployeesSerivce();

export const checkDuplicateEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await employeesSerivce.findEmployee({email: req.body.email});
    if (employee) {
      return responseMessageService.failureResponse({
        res,
        message: 'Email already exists!'
      });
    }
    next();
  } catch (err) {
    return responseMessageService.mongoError({
      res,
      err
    })
  }
}