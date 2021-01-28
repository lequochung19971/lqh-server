import { LoggerService } from "../shared/services/logger.service";
import { ResponseMessageService } from "../shared/services/response-message.service";

export abstract class BaseController {
  protected responseMessageService: ResponseMessageService;
  protected logger: LoggerService;

  constructor() {
    this.responseMessageService = new ResponseMessageService();
    this.logger = new LoggerService();
  }
  
}