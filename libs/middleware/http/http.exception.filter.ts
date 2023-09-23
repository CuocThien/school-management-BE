import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IGateWayResponse, getLogMessage } from 'libs/utils';
import { hostname } from 'os';
import { QueryFailedError } from 'typeorm';
import * as moment from 'moment';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const res: any =
      exception instanceof HttpException ? exception.getResponse() : {};
    let reponsePayload: IGateWayResponse = {
      errors: null,
      message: 'INTERNAL_SERVER_ERROR',
      status: 500,
      data: null,
      details: res?.details || [],
    };

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res: any = exception.getResponse();
      reponsePayload = Object.assign(reponsePayload, {
        status: statusCode,
        message: typeof res === 'string' ? res : res.message,
      });
      response.status(statusCode).json(reponsePayload);
      return;
    }

    if (exception instanceof QueryFailedError) {
      statusCode = HttpStatus.BAD_REQUEST;
      reponsePayload = Object.assign(reponsePayload, {
        status: statusCode,
        message: exception.message,
      });
    } else if (exception instanceof Error) {
      reponsePayload = Object.assign(reponsePayload, {
        errors: exception.stack,
      });
    }
    response.status(statusCode).json(reponsePayload);
    this._notificationError(request, exception);
  }

  private _notificationError(request, exception) {
    const exceptionResponse = exception.response || {};
    const error = exceptionResponse.message || exceptionResponse.error;
    const content = exception.stack.replace('[object Object]', error);
    if (content.includes('favicon.ico')) {
      return;
    }
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const realIp = request?.headers['x-real-ip'];
    const proxyIp = request.ip;
    const objLog: any = {
      '@timestamp': new Date().toISOString(),
      application: process.env.npm_package_name,
      callerAddress: realIp || proxyIp,
      hostname: hostname(),
      pid: process.pid.toString(),
      level: 'ERROR',
      time: currentTime,
      reqUserId: request['accountId'] || 0,
      organizationId: request['organizationId'] || 0,
      source: 'client',
      message: content,
      callPoint: request.url,
      method: request.method,
    };
    console.log(getLogMessage(objLog));
  }
}
