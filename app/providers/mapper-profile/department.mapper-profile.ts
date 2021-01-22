import { DepartmentModel } from '../model/department.model';
import { DepartmentDTO } from '../dto/department-dto.model';
import { Mapper } from '@automapper/types';
export const departmentMapperProfile = (mapper: Mapper) => {
  mapper.createMap(DepartmentModel, DepartmentDTO)
  mapper.createMap(DepartmentDTO, DepartmentModel)
}
