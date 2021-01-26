import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { SERVER_CONFIG } from '../providers/config/ts/server-config';
import { EmployeesSerivce } from '../model/employees/employees.service';
import { ResponseMessageService } from '../shared/services/response-message.service';

const responseMessageService = new ResponseMessageService();
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SERVER_CONFIG.JWT.SECRET_KEY,
}

const employeesSerivce = new EmployeesSerivce();

export default new Strategy(opts, 
  async (payload, done) => {
    try {
      const employee = await employeesSerivce.findEmployee({_id: payload.id});

      if (employee) {
        return done(null, employee);
      }    

      return done(null, false);
    } catch (error) {
      console.log(error);
    }
  }
);