import { IModificationNote } from '../interface/modification-note.interface';

export class BaseDTO {
  propertyKeys: string[];

  public mappingProperties?(props: any) {
    Object.assign(this, props);
  }
}