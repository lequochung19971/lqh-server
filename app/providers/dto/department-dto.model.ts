import { AutoMap } from '@automapper/classes';
import 'reflect-metadata';
import { Departments } from '../enum/departments.enum';
import { BaseDTO } from './base-dto.model';

export class DepartmentDTO extends BaseDTO {
  @AutoMap()
  id: Departments;
  
  @AutoMap()
  name: string
}