import { Gender } from '../enum/gender.enum';
import { Departments } from '../enum/departments.enum';

export class EmployeeFE {
  _id?: string;
  dob: string;
  age: number;
  fullName: string;
  email: string;
  phone: number;
  department: Departments;
  gender: Gender;
  avatar: string;

  constructor(props?: EmployeeFE) {
    if (props) {
      this._id = props._id;
      this.dob = props.dob;
      this.age = props.age;
      this.fullName = props.fullName;
      this.email = props.email;
      this.phone = props.phone;
      this.department = props.department;
      this.gender = props.gender;
      this.avatar = props.avatar;
    }
  }
}
