import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { SERVER_CONFIG } from '../providers/config/ts/server-config';
import { EmployeeSerivce } from '../model/employee/employee.service';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SERVER_CONFIG.JWT.SECRET_KEY,
}

const employeeSerivce = new EmployeeSerivce();

export default new Strategy(opts, 
  async (payload, done) => {
    try {
      const employee = await employeeSerivce.findEmployee({_id: payload.id});

      if (employee) {
        return done(null, employee);
      }    

      return done(null, false);
    } catch (error) {
      console.log(error);
    }
  }
);