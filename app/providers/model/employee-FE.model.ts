import { Gender } from '../enum/gender.enum';
import { Departments } from '../enum/departments.enum';
import { AddressModel } from './address.model';
import { IDCard } from './id-card.model';
import { BaseModel } from './base.model';

export class EmployeeFE extends BaseModel{
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
  idCardInfo: IDCard;
  avatar?: string;

  constructor(props?: EmployeeFE) {
    super(props);
  }
}
