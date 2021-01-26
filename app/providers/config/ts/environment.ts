import { EnvironmentsEnum } from '../../enum/environment.enum';

class Environment {
  private environment: string;

  constructor(environment: string) {
    this.environment = environment;
  }

  protected createConfig<T>(devConfig: any, prodConfig: any, localConfig: any): T {
    if (this.environment === EnvironmentsEnum.dev_environment) {
      return devConfig;
    } 
    
    if (this.environment === EnvironmentsEnum.prod_environment) {
      return prodConfig;
    }

    return localConfig;
  }

  get PORT(): number {
    return this.createConfig<number>(3001, 3002, 3000);
  }

  get DB_NAME(): string {
    return this.createConfig<string>('ecommerce-db_dev', 'ecommerce-db_prod', 'ecommerce-db_local');
  }

  get PRODUCTION(): boolean {
    return this.createConfig<boolean>(true, true, false);
  }
}

export default new Environment(EnvironmentsEnum.local_environment);