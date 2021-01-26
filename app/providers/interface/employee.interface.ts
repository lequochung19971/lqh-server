import { DepartmentModel } from '../model/department.model';
import { PositionModel } from '../model/position.model';
import { Gender } from '../enum/gender.enum';
import { AddressesModel } from '../model/addresses.model';
import { IDCardModel } from '../model/id-card.model';
import { IPasswordHashing } from './password-hashing.interface';
import { IModificationNote } from './modification-note.interface';
import { DepartmentDTO } from '../dto/department-dto.model';
import { PositionDTO } from '../dto/position-dto.model';
import { AddressDTO } from '../dto/addresses-dto.model';
import { IDCardDTO } from 'providers/dto/id-card-dto.model';

export interface IEmployee {
  _id?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  age?: string;
  email?: string;
  phone?: string;
  department?: DepartmentModel | DepartmentDTO;
  position?: PositionModel | PositionDTO;
  gender?: Gender;
  addressInfo?: AddressesModel | AddressDTO;
  idCardInfo?: IDCardModel | IDCardDTO;
  password?: IPasswordHashing | string;
  modificationNote?: IModificationNote[];
}