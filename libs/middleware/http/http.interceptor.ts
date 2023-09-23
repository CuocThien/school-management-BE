import {
  ExecutionContext,
  CallHandler,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  DelegatorService,
  InjectOgmaInterceptorOptions,
  OgmaInterceptorOptions,
  OgmaService,
} from '@ogma/nestjs-module';
import { InterceptorMeta } from '@ogma/nestjs-module/lib/interceptor/interfaces/interceptor-service.interface';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OgmaOptions } from '@ogma/logger';
import { RequestContext } from 'nestjs-request-context';
import { getLogMessage } from 'libs/utils';
import * as moment from 'moment';
import { hostname } from 'os';

@Injectable()
export class HttpOgmaInterceptor implements NestInterceptor {
  private json: boolean;
  private color: boolean;

  constructor(
    @InjectOgmaInterceptorOptions()
    private readonly options: OgmaInterceptorOptions,
    private readonly service: OgmaService,
    private readonly delegate: DelegatorService,
    private readonly reflector: Reflector,
  ) {
    const ogmaOptions: OgmaOptions = (this.service as any).ogma.options;
    this.json = ogmaOptions.json;
    this.color = ogmaOptions.color;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const startTime = Date.now();
    const options = { ...this.options, json: this.json, color: this.color };
    const reqContext: any = RequestContext.currentContext.req;
    const requestId = reqContext['requestId'];
    this.delegate.setRequestId(context, requestId);
    return next.handle().pipe(
      this.rxJsLogTap({
        context,
        startTime,
        options,
        correlationId: requestId,
      }),
    );
  }

  public shouldLogAndDoIt(
    method: 'Error' | 'Success',
    {
      context,
      startTime,
      data,
      correlationId,
      options,
    }: InterceptorMeta & { data: any },
  ): void {
    const callMethod = `getContext${method}String`;
    if (this.shouldSkip(context)) return;
    const logObject = this.delegate[callMethod](
      data,
      context,
      startTime,
      options,
    );
    const reqContext: any = RequestContext.currentContext.req;
    let newObj: any = {
      callerAddress: logObject?.callerAddress || null,
      method: logObject?.method || null,
      callPoint: logObject?.callPoint || null,
      responseTime: logObject?.responseTime || null,
      contentLength: logObject?.contentLength || null,
      protocol: logObject?.protocol || null,
      status: logObject?.status || null,
    };
    const realIp = reqContext?.headers['x-real-ip'];
    const proxyIp = reqContext.ip;
    newObj = Object.assign(newObj, {
      callerAddress: realIp || proxyIp,
      organizationId: reqContext['organizationId'],
      reqUserId: reqContext['accountId'],
      source: 'client',
    });
    const isAcceptLog = ['production', 'staging'].includes(process.env.ENV);
    if (isAcceptLog) {
      const userAgent = reqContext?.headers['user-agent'];
      const clientVersion = reqContext?.headers['x-client-version'] || '0.0.0';
      newObj = Object.assign(newObj, {
        userAgent,
        clientVersion,
      });
    }
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    newObj = Object.assign(
      {
        '@timestamp': new Date().toISOString(),
        application: process.env.npm_package_name,
        hostname: hostname(),
        pid: process.pid.toString(),
        level: 'INFO',
        requestId: correlationId,
        time: currentTime,
      },
      newObj,
    );
    console.log(getLogMessage(newObj));
  }

  public shouldSkip(context: ExecutionContext): boolean {
    const decoratorSkip =
      this.reflector.get('OGMA_INTERCEPTOR_SKIP', context.getClass()) ||
      this.reflector.get('OGMA_INTERCEPTOR_SKIP', context.getHandler());
    if (decoratorSkip) {
      return true;
    }
    return !this.options.http;
  }

  public rxJsLogTap(meta: InterceptorMeta): MonoTypeOperatorFunction<void> {
    return tap({
      next: (data) => {
        const info = { ...meta, data };
        this.shouldLogAndDoIt('Success', info);
      },
      error: (err) => {
        const info = { ...meta, data: err };
        this.shouldLogAndDoIt('Error', info);
      },
    });
  }
}
