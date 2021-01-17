import { AddressTypes } from "../enum/address-types.enum";
import { BaseModel } from "./base.model";

export class AddressModel extends BaseModel {
  province: Address;
  district: Address;
  ward: Address;

  constructor(props?: AddressModel) {
    super(props);
  }
}

export class Address extends BaseModel {
  name?: string;
  type?: AddressTypes;
  nameWithType?: string;
  path?: string;
  pathWithType?:string;
  code?: string;
  parentCode?:string;
  slug?: string;

  constructor(props?: AddressModel) {
    super(props);
  }
}