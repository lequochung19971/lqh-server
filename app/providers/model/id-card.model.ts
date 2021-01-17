import { Dayjs } from "dayjs";
import { Address } from "./address.model";
import { BaseModel } from "./base.model";

export class IDCard extends BaseModel {
  idNumber: string;
  createDate: Dayjs;
  createPlace: Address;
  constructor(props?: IDCard) {
    super(props)
  }
}