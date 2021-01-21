import { Dayjs } from "dayjs";
import { Address } from "./address.model";
import { BaseModel } from "./base.model";

export class IDCardModel extends BaseModel {
  idNumber: string;
  createDate: Dayjs;
  createPlace: Address;
  constructor(props?: IDCardModel) {
    super(props)
  }
}