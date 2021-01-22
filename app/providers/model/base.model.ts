import { IModificationNote } from '../interface/modification-note.interface';

export class BaseModel {
  propertyKeys: string[];

  public mappingProperties?(props: any) {
    Object.assign(this, props);
  }
  
  get hasEnoughParams(): boolean {
    const data = this;
    const requiredParams = this.constructor['propertyKeys']
    if (!requiredParams?.length || !data) { return false; }

    return requiredParams.every(param => data[param]);
  }
}