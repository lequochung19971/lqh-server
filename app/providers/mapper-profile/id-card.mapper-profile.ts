import { Mapper } from '@automapper/types';
import { IDCardDTO } from '../dto/id-card-dto.model';
import { IDCardModel } from '../model/id-card.model';

export const idCardMapperProfile = (mapper: Mapper) => {
  mapper.createMap(IDCardDTO, IDCardModel)
  mapper.createMap(IDCardModel, IDCardDTO)
}