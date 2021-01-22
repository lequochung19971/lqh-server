import { AutoMap } from '@automapper/classes';
import 'reflect-metadata';
import { Departments } from '../../providers/enum/departments.enum';
import { BaseModel } from './base.model';

export class DepartmentModel extends BaseModel {
  @AutoMap()
  id: Departments;
  
  @AutoMap()
  name: string
}