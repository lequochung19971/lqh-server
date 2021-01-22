import { AutoMap } from "@automapper/classes";
import { AddressTypes } from "../enum/address-types.enum";
import { BaseDTO } from './base-dto.model';

export class AddressDTO extends BaseDTO {
  @AutoMap()
  name?: string;
  
  @AutoMap()
  type?: AddressTypes;
  
  @AutoMap()
  nameWithType?: string;
  
  @AutoMap()
  path?: string;
  
  @AutoMap()
  pathWithType?:string;
  
  @AutoMap()
  code?: string;
  
  @AutoMap()
  parentCode?:string;
  
  @AutoMap()
  slug?: string;
}

export class AddressesDTO  extends BaseDTO {
  @AutoMap(() => AddressDTO)
  province: AddressDTO;
  
  @AutoMap(() => AddressDTO)
  district: AddressDTO;

  @AutoMap(() => AddressDTO)
  ward: AddressDTO;
}
