import { AutoMap } from "@automapper/classes";
import { AddressTypes } from "../enum/address-types.enum";
import { BaseModel } from './base.model';

export class Address extends BaseModel {
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

  constructor() {
    super();
  }
}

export class AddressesModel extends BaseModel{
  @AutoMap(() => Address)
  province: Address;
  
  @AutoMap(() => Address)
  district: Address;

  @AutoMap(() => Address)
  ward: Address;

  constructor() {
    super();
  }
}
