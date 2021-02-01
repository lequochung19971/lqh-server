import { Mapper } from "@automapper/types";
import { AddressesDTO, AddressDTO } from '../../../providers/dto/addresses-dto.model';
import { AddressesModel, Address } from '../../../providers/model/addresses.model';

export const addressMapperProfile = (mapper: Mapper) => {
  mapper.createMap(AddressesDTO, AddressesModel);
  mapper.createMap(AddressesModel, AddressesDTO);
  mapper.createMap(AddressDTO, Address);
  mapper.createMap(Address, AddressDTO);
}