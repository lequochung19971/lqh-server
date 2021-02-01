import { Mapper } from '@automapper/types';
import { PositionDTO } from '../../../providers/dto/position-dto.model';
import { PositionModel } from '../../../providers/model/position.model';

export const positionMapperProfile = (mapper: Mapper) => {
  mapper.createMap(PositionModel, PositionDTO)
  mapper.createMap(PositionDTO, PositionModel)
}