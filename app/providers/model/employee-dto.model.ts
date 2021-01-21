import { Gender } from '../enum/gender.enum';
import { Departments } from '../enum/departments.enum';
import { AddressModel } from './address.model';
import { IDCardModel } from './id-card.model';
import { BaseModel } from './base.model';
import { Employee } from './employee.model';

export class EmployeeDTO extends BaseModel {
  _id: string;
  firstName: string;
  lastName: string;
  dob: string;
  age: string;
  email: string;
  phone: string;
  department: Departments;
  position: string;
  gender: Gender;
  addressInfo: AddressModel;
  idCardInfo: IDCardModel;
  avatar?: string;

  constructor(props?: EmployeeDTO) {
    super(props);
  }

  fromEmloyee(employee: Employee): void {
    this.mappingProperties(employee);
  }
}
