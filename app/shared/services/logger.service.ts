import { LoggerLevel } from '../../providers/enum/logger-level.enum';
import env from '../../providers/config/ts/environment';

export class LoggerService {
  production: boolean = false;

  LOG(message: any): void {
    this.log(message, LoggerLevel.LOG);
  }

  WARN(message: any): void {
    this.log(message, LoggerLevel.WARN);
  }

  ERROR(message: any): void {
    this.log(message, LoggerLevel.ERROR);
  }

  INFO(message: any): void {
    this.log(message, LoggerLevel.INFO);
  }

  DEBUG(message: any): void {
    this.log(message, LoggerLevel.DEBUG);
  }

  private log(message: any, level = LoggerLevel.LOG) {
    if (!env.PRODUCTION) {
      switch (level) {
        case LoggerLevel.LOG:
          console.log(message);
          break;

        case LoggerLevel.WARN:
          console.warn(message);
          break;

        case LoggerLevel.ERROR:
          console.error(message);
          break;

        case LoggerLevel.INFO:
          console.info(message);
          break;

        case LoggerLevel.DEBUG:
          console.debug(message);
          break;
        default:
          break;
      }
    }
  }
}
