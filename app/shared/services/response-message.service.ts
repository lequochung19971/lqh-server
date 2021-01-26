import { IResponseMessage } from '../../providers/interface/response-message.interface';
import { ResponseStatus } from '../../providers/enum/response-status.enum';
import { LoggerService } from './logger.service';
import _ from 'lodash';

export class ResponseMessageService {
  protected logger: LoggerService;

  constructor() {
    this.logger = new LoggerService();
  }

  successReponse({res, message, data, meta}: IResponseMessage) {
    res.status(ResponseStatus.SUCCESS).json(_.pickBy({
      STATUS: 'SUCCESS',
      MESSAGE: message,
      DATA: data,
      META: meta
    }, value => !!value))
  }

  failureResponse({res, message, err}: IResponseMessage) {
    res.status(ResponseStatus.BAD_REQUEST).json(_.pickBy({
        STATUS: 'FAILURE',
        MESSAGE: message,
        DATA: err
    }, value => !!value));
  }

  insufficientParams({res}: IResponseMessage) {
    res.status(ResponseStatus.BAD_REQUEST).json({
      STATUS: 'FAILURE',
      MESSAGE: 'Dont have enough params',
    })
  }

  logginError({res, message}: IResponseMessage) {
    res.status(ResponseStatus.UNAUTHORIZED).json({
      STATUS: 'FAILURE',
      MESSAGE: message
    })
  }

  mongoError({res, err}: IResponseMessage) {
    res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json(_.pickBy({
      STATUS: 'FAILURE',
      MESSAGE: 'MongoDB Error',
      DATA: err
    },value => !!value))
  }
}