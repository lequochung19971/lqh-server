import { EnvironmentsEnum } from './providers/enum/environment.enum';

class Environment {
  private environment: string;

  constructor(environment: string) {
    this.environment = environment;
  }

  get port(): number {
    if (this.environment === EnvironmentsEnum.dev_environment) {
      return 3001;
    } 
    
    if (this.environment === EnvironmentsEnum.prod_environment) {
      return 3002;
    }

    return 3000;
  }

  get databaseName(): string {
    if (this.environment === EnvironmentsEnum.dev_environment) {
      return 'ecommerce-db_dev';
    } 
    
    if (this.environment === EnvironmentsEnum.prod_environment) {
      return 'ecommerce-db_prod';
    }

    return 'ecommerce-db_local';
  }

  get production(): boolean {
    if (this.environment === EnvironmentsEnum.dev_environment) {
      return true;
    } 
    
    if (this.environment === EnvironmentsEnum.prod_environment) {
      return true;
    }

    return false;
  }
}

export default new Environment(EnvironmentsEnum.local_environment);