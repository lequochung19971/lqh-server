import { AutoMap } from '@automapper/classes';
import 'reflect-metadata';
import { Departments } from '../enum/departments.enum';
import { BaseDTO } from './base-dto.model';

export class PositionDTO extends BaseDTO {
  @AutoMap()
  id: string;
  
  @AutoMap()
  name: string
  
  @AutoMap()
  departmentId: Departments
}