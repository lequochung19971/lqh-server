import 'reflect-metadata';
import { BaseModel } from './base.model';
import { Departments } from '../enum/departments.enum';
import { AutoMap } from '@automapper/classes';

export class PositionModel extends BaseModel {
  @AutoMap()
  id: string;
  
  @AutoMap()
  name: string
  
  @AutoMap()
  departmentId: Departments
}