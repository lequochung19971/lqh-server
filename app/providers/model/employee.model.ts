import { Gender } from '../enum/gender.enum';
import { Departments } from '../enum/departments.enum';
import { BaseModel } from './base.model';
import { IPasswordHashing } from '../../providers/interface/password-hashing.interface';
import { AddressModel } from './address.model';
import { IDCard } from './id-card.model';

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
  idCardInfo: IDCard;
  avatar?: string;
  password: IPasswordHashing;

  constructor(props?: Employee) {
    super(props);
    if (props) {
      this._id = props._id;
      this.firstName = props.firstName;
      this.lastName = props.lastName;
      this.dob = props.dob;
      // this.age = props.age;
      this.email = props.email;
      this.phone = props.phone;
      this.department = props.department;
      this.position = props.position;
      this.gender = props.gender;
      this.addressInfo = props.addressInfo;
      this.idCardInfo = props.idCardInfo;
      this.password = props.password;
      // this.avatar = props.avatar;
    }
  }
}
