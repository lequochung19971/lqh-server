import { IResponseMessage } from '../../providers/interface/response-message.interface';
import { ResponseStatus } from '../../providers/enum/response-status.enum';
import { LoggerService } from './logger.service';

export class ResponseMessageService {
  protected logger: LoggerService;

  constructor() {
    this.logger = new LoggerService();
  }

  successReponse({res, message, data, meta}: IResponseMessage) {
    // this.logger.LOG({
    //   STATUS: 'SUCCESS',
    //   MESSAGE: message,
    //   DATA: data
    // })
    res.status(ResponseStatus.SUCCESS).json({
      STATUS: 'SUCCESS',
      MESSAGE: message,
      DATA: data,
      META: meta
    })
  }

  failureResponse({res, message, err}: IResponseMessage) {
    res.status(ResponseStatus.BAD_REQUEST).json({
        STATUS: 'FAILURE',
        MESSAGE: message,
        DATA: err
    });
  }

  insufficientParams({res}: IResponseMessage) {
    res.status(ResponseStatus.BAD_REQUEST).json({
      STATUS: "FAILURE",
      MESSAGE: 'Dont have enough params',
    })
  }

  mongoError({res, err}: IResponseMessage) {
    res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
      STATUS: 'FAILURE',
      MESSAGE: 'MongoDB Error',
      DATA: err
    })
  }
}