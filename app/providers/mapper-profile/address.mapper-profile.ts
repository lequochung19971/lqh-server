import { Mapper } from "@automapper/types";
import { AddressesDTO, AddressDTO } from '../dto/addresses-dto.model';
import { AddressesModel, Address } from '../model/addresses.model';

export const addressMapperProfile = (mapper: Mapper) => {
  mapper.createMap(AddressesDTO, AddressesModel);
  mapper.createMap(AddressesModel, AddressesDTO);
  mapper.createMap(AddressDTO, Address);
  mapper.createMap(Address, AddressDTO);
}