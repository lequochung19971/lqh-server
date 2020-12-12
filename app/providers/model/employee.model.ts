import { Gender } from '../enum/gender.enum';
import { Departments } from '../enum/departments.enum';
import { BaseModel } from './base.model';
import { IPasswordHashing } from '../../providers/interface/password-hashing.interface';

export class Employee extends BaseModel{
  _id?: string;
  dob: string;
  age: number;
  fullName: string;
  email: string;
  phone: number;
  department: Departments;
  password: IPasswordHashing;
  gender: Gender;
  avatar: string;

  constructor(props?: Employee) {
    super(props);
    if (props) {
      this._id = props._id;
      this.dob = props.dob;
      this.age = props.age;
      this.fullName = props.fullName;
      this.email = props.email;
      this.phone = props.phone;
      this.department = props.department;
      this.password = props.password;
      this.gender = props.gender;
      this.avatar = props.avatar;
    }
  }
}
