import { Mapper } from '@automapper/types';
import { DepartmentDTO } from '../../../providers/dto/department-dto.model';
import { DepartmentModel } from '../../../providers/model/department.model';
export const departmentMapperProfile = (mapper: Mapper) => {
  mapper.createMap(DepartmentModel, DepartmentDTO)
  mapper.createMap(DepartmentDTO, DepartmentModel)
}
