import employeesSchema from "./employees.schema";
import { Employee } from '../../providers/model/employee.model';
import { getUUID } from '../../shared/services/utilities.service';

export class EmployeesSerivce {
  async createEmployee(query: Employee): Promise<any> {
    console.log(query);
    const model = new employeesSchema({...query, _id: getUUID()});
    return model.save();
  }

  async updateEmployee(params: Employee): Promise<any> {
    const query = { _id: params._id };
    const options = { new: true, upsert: true, overwrite: false };
    return employeesSchema.findOneAndUpdate(query, params, options).exec();
  }

  async getEmployees(query: any): Promise<any> {
    return employeesSchema.find({}, null, query).exec();
  }

  async filterEmployee(condition: any, fields: string | string[] | any): Promise<any> {
    return employeesSchema.findOne(condition, fields).exec();
  }

  async deleteEmployee(_id: string): Promise<any> {
    const query = { _id };
    console.log(query)
    employeesSchema.deleteOne(query).exec();
  }

  async countEmployees(query?: any): Promise<any> {
    return new Promise((resolve, rejects) => {
      employeesSchema.estimatedDocumentCount(query, (err, data) => {
        if (err) {
          rejects(err)
        } else {
          resolve(data);
        }
      });
    })
  }
}