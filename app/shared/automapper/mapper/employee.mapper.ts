import { classes } from "@automapper/classes";
import { createMapper } from "@automapper/core";
import { employeeMapperProfile } from '../mapper-profile/employee.mapper-profile';
import { addressMapperProfile } from '../mapper-profile/address.mapper-profile';
import { idCardMapperProfile } from "../mapper-profile/id-card.mapper-profile";
import { positionMapperProfile } from "../mapper-profile/position.mapper-profile";
import { departmentMapperProfile } from "../mapper-profile/department.mapper-profile";

export const employeeMapper = createMapper({
  name: 'Employee',
  pluginInitializer: classes
})

employeeMapper
  .addProfile(employeeMapperProfile)
  .addProfile(addressMapperProfile)
  .addProfile(idCardMapperProfile)
  .addProfile(positionMapperProfile)
  .addProfile(departmentMapperProfile)
