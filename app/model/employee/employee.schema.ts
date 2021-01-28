import { Document, model, Schema } from 'mongoose';
import { modificationNoteSchema } from '../../providers/schema/modification-note.schema';
import { IModificationNote } from '../../providers/interface/modification-note.interface';
import { DepartmentModel } from '../../providers/model/department.model';
import { PositionModel } from '../../providers/model/position.model';
import { Gender } from '../../providers/enum/gender.enum';
import { AddressesModel } from '../../providers/model/addresses.model';
import { IDCardModel } from '../../providers/model/id-card.model';
import { IPasswordHashing } from '../../providers/interface/password-hashing.interface';
import { EmployeeModel } from '../../providers/model/employee.model';
import { IEmployee } from '../../providers/interface/employee.interface';
import { PasswordHasherService } from '../../shared/services/password-hasher.service';

const passwordHasherService = new PasswordHasherService();
export interface IEmployeeDocument extends Document, IEmployee {
  _id: string;
  firstName: string;
  lastName: string;
  dob: string;
  age: string;
  email: string;
  phone: string;
  department: DepartmentModel;
  position: PositionModel;
  gender: Gender;
  addressInfo: AddressesModel;
  idCardInfo: IDCardModel;
  password: IPasswordHashing;
  modificationNote: IModificationNote[];
  _doc: EmployeeModel;
  comparePassword: (password: string) => Promise<boolean>
}

const employeeSchema: Schema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  department: {
    type: Object,
    required: true,
  },
  position: {
    type: Object,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  addressInfo: {
    type: Object,
    required: true,
  },
  idCardInfo: {
    type: Object,
    required: true,
  },
  password: {
    type: Object,
    required: false,
  },
  avatar: {
    type: String
  },
  modificationNote: [modificationNoteSchema],
});

employeeSchema.methods.comparePassword = function (password: string): boolean {
  return passwordHasherService.compare(password, this.password)
}

export default model<IEmployeeDocument>('employee', employeeSchema);
