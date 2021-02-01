import { BaseModel } from './base.model';
import { DepartmentModel } from './department.model';
import { PositionModel } from './position.model';
import { Gender } from '../enum/gender.enum';
import { AddressesModel } from './addresses.model';
import { IDCardModel } from './id-card.model';
import { AutoMap } from '@automapper/classes';
import { IModificationNote } from '../interface/modification-note.interface';
import { RequiredParams } from '../../shared/services/utilities.service';
import { IPasswordHashing } from '../interface/password-hashing.interface';
import { IEmployee } from '../interface/employee.interface';

export class EmployeeModel extends BaseModel implements IEmployee {
  @AutoMap()
  _id: string;

  @RequiredParams()
  @AutoMap()
  firstName: string;

  @RequiredParams()
  @AutoMap()
  lastName: string;

  @RequiredParams()
  @AutoMap()
  dob: string;

  @RequiredParams()
  @AutoMap()
  age: string;
  
  @RequiredParams()
  @AutoMap()
  email: string;
  
  @RequiredParams()
  @AutoMap()
  phone: string;
  
  @RequiredParams()
  @AutoMap(() => DepartmentModel)
  department: DepartmentModel;
  
  @RequiredParams()
  @AutoMap(() => PositionModel)
  position: PositionModel;
  
  @RequiredParams()
  @AutoMap()
  gender: Gender;

  @RequiredParams()
  @AutoMap(() => AddressesModel)
  addressInfo: AddressesModel;

  @RequiredParams()
  @AutoMap(() => IDCardModel)
  idCardInfo: IDCardModel;

  @AutoMap()
  password: IPasswordHashing

  @AutoMap()
  avatar: string;

  modificationNote: IModificationNote[];


  constructor(props?: any) {
    super(props);
  }
}
