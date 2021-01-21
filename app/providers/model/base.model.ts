import { IModificationNote } from '../interface/modification-note.interface';

export class BaseModel {
  modificationNote?: IModificationNote[];

  constructor(props?:BaseModel) {
    if (props) {
      this.modificationNote = props.modificationNote;
    }
  }

  public mappingProperties?(props: any) {
    Object.assign(this, props);
  }
}