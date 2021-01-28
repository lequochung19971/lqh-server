import { Request, Response, NextFunction } from "express";
import { ResponseMessageService } from '../services/response-message.service';
import { EmployeeSerivce } from '../../model/employee/employee.service';

const responseMessageService = new ResponseMessageService();
const employeeSerivce = new EmployeeSerivce();

export const checkDuplicateEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await employeeSerivce.findEmployee({email: req.body.email});
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