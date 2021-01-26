export class BaseModel {
  propertyKeys: string[];

  constructor(props?: any) {
    if (props) {
      this.mappingProperties(props);
    }
  }

  public mappingProperties?(props: any) {
    Object.assign(this, props);
  }
  
  get hasEnoughParams(): boolean {
    const requiredParams = (this.constructor as unknown as BaseModel).propertyKeys;
    if (!requiredParams?.length) { return false; }

    return requiredParams.every((param: string) => this[param]);
  }
}