import { Mapper } from '@automapper/types';
import { IDCardDTO } from '../../../providers/dto/id-card-dto.model';
import { IDCardModel } from '../../../providers/model/id-card.model';

export const idCardMapperProfile = (mapper: Mapper) => {
  mapper.createMap(IDCardDTO, IDCardModel)
  mapper.createMap(IDCardModel, IDCardDTO)
}