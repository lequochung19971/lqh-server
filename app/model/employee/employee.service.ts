import employee, { IEmployeeDocument } from './employee.schema';
import { EmployeeModel } from '../../providers/model/employee.model';
export class EmployeeSerivce {
  async saveEmployee(query: EmployeeModel): Promise<IEmployeeDocument> {
    const model = new employee(query);
    return model.save();
  }

  async updateEmployee(params: EmployeeModel): Promise<IEmployeeDocument> {
    const query = { _id: params._id };
    const options = { new: true, upsert: true, overwrite: false };
    return employee.findOneAndUpdate(query, params, options);
  }

  async findEmployees(query: any): Promise<IEmployeeDocument[]> {
    return employee.find({}, null, query);
  }

  async findEmployee(condition: any, fields?: string | string[] | any): Promise<IEmployeeDocument> {
    return employee.findOne(condition, fields);
  }

  async findEmployeeById(_id: string): Promise<IEmployeeDocument> {
    return employee.findById(_id);
  }

  async deleteEmployeeById(_id: string): Promise<any> {
    employee.findByIdAndDelete(_id);
  }

  async countEmployees(query?: any): Promise<number> {
    return new Promise((resolve, rejects) => {
      employee.estimatedDocumentCount(query, (err, data) => {
        if (err) {
          rejects(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}