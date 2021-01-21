import { Gender } from '../enum/gender.enum';
import { Departments } from '../enum/departments.enum';
import { BaseModel } from './base.model';
import { IPasswordHashing } from '../../providers/interface/password-hashing.interface';
import { AddressModel } from './address.model';
import { IDCardModel } from './id-card.model';
import { EmployeeDTO } from './employee-dto.model';

export class Employee extends BaseModel{
  _id?: string;
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
  password: IPasswordHashing;

  constructor(props?: Employee) {
    super(props);
  }

  fromEmloyeeDTO(employeeDTO: any) {
    this.mappingProperties(employeeDTO);
  }
}
