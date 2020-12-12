import { IModificationNote } from '../interface/modification-note.interface';

export class BaseModel {
  modificationNote?: IModificationNote[];

  constructor(props?:BaseModel) {
    this.modificationNote = props.modificationNote;
  }
}