import { AutoMap } from "@automapper/classes";
import { AddressDTO } from "./addresses-dto.model";
import { BaseDTO } from './base-dto.model';

export class IDCardDTO extends BaseDTO {
  @AutoMap()
  idNumber: string;

  @AutoMap()
  createDate: string;

  @AutoMap(() => AddressDTO)
  createPlace: AddressDTO;
  
  constructor(props?: any) {
    super();
  }
}