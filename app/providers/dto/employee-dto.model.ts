import { Gender } from '../enum/gender.enum';
import { BaseDTO } from './base-dto.model';
import { AddressesDTO } from './addresses-dto.model';
import { DepartmentDTO } from './department-dto.model';
import { PositionDTO } from './position-dto.model';
import { IDCardDTO } from './id-card-dto.model';
import { AutoMap } from '@automapper/classes';
import { IEmployee } from '../interface/employee.interface';

export class EmployeeDTO extends BaseDTO implements IEmployee {
  @AutoMap()
  _id: string;
  
  @AutoMap()
  firstName: string;
  
  @AutoMap()
  lastName: string;
  
  @AutoMap()
  dob: string;
  
  @AutoMap()
  age: string;
  
  @AutoMap()
  email: string;
  
  @AutoMap()
  phone: string;

  @AutoMap()
  gender: Gender;
  
  @AutoMap(() => DepartmentDTO)
  department: DepartmentDTO;
  
  @AutoMap(() => PositionDTO)
  position: PositionDTO;

  @AutoMap(() => AddressesDTO)
  addressInfo: AddressesDTO;

  @AutoMap(() => IDCardDTO)
  idCardInfo: IDCardDTO;
  
  @AutoMap()
  password: string;
  
  @AutoMap()
  avatar: string;
}
