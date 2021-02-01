import { convertUsing, fromValue, ignore, mapFrom } from '@automapper/core';
import { Mapper } from '@automapper/types';
import { EmployeeDTO } from '../../../providers/dto/employee-dto.model';
import { EmployeeModel } from '../../../providers/model/employee.model';
import { passwordConverted } from '../converter/password.converter';
import { getUUID } from '../../services/utilities.service';
import { isNil, pickBy } from 'lodash';

export const employeeMapperProfile = (mapper: Mapper) => {
  mapper
    .createMap(EmployeeDTO, EmployeeModel)
      .forMember((d) => d.modificationNote, fromValue([]))
      .forMember((d) => d.password, convertUsing(passwordConverted, (s) => s.password ))
      .forMember((d) => d._id,
        mapFrom(s => s._id || getUUID())
      )
      .afterMap((_s, d) => {
        return pickBy(d, (value) => {
          return !isNil(value);
        })
      })

  mapper
    .createMap(EmployeeModel, EmployeeDTO)
    .forMember((d) => d.password, ignore());
};