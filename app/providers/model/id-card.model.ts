import { AutoMap } from "@automapper/classes";
import { Address } from "./addresses.model";
import { BaseModel } from './base.model';

export class IDCardModel extends BaseModel {
  @AutoMap()
  idNumber: string;

  @AutoMap()
  createDate: string;

  @AutoMap(() => Address)
  createPlace: Address;
  
  constructor() {
    super();
  }
}