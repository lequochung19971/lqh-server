import { PositionModel } from '../model/position.model';
import { PositionDTO } from '../dto/position-dto.model';
import { Mapper } from '@automapper/types';
export const positionMapperProfile = (mapper: Mapper) => {
  mapper.createMap(PositionModel, PositionDTO)
  mapper.createMap(PositionDTO, PositionModel)
}