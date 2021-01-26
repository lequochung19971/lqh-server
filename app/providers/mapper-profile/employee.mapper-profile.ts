import { EmployeeDTO } from '../dto/employee-dto.model';
import { EmployeeModel } from '../model/employee.model';
import { convertUsing, fromValue, ignore, mapFrom } from '@automapper/core';
import { Mapper } from '@automapper/types';
import { passwordConverted } from '../../shared/converter/password.converter';
import { getUUID } from '../../shared/services/utilities.service';

export const employeeMapperProfile = (mapper: Mapper) => {
  mapper
    .createMap(EmployeeDTO, EmployeeModel)
    .forMember((d) => d.modificationNote, fromValue([]))
    .forMember((d) => d.password, convertUsing(passwordConverted, (s) => s.password ))
    .forMember((d) => d._id,
      mapFrom(s => s._id || getUUID())
    )

  mapper
    .createMap(EmployeeModel, EmployeeDTO)
    .forMember((d) => d.password, ignore());
};