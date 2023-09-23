import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IServiceResponse } from 'libs/utils';

@Injectable()
export class HttpTransformInterceptor<T>
  implements NestInterceptor<T, IServiceResponse>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IServiceResponse> {
    const isIgnore = context.getHandler()['IGNORE_TRANSFORM'];
    if (isIgnore) return next.handle().pipe(map((data) => data));
    return next.handle().pipe(
      map((res) => {
        const response: IServiceResponse = {
          status: 200,
          data: null,
          errors: null,
          message: null,
        };
        context.switchToHttp().getResponse().status(res.status);
        return Object.assign(response, res);
      }),
    );
  }
}
