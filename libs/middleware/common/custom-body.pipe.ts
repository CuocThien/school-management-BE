import { PipeTransform, Injectable } from '@nestjs/common';
import { isObject, isEmpty } from 'lodash';
@Injectable()
export class CustomBodyPipe implements PipeTransform {
  transform(value: any) {
    if (isObject(value) && !isEmpty(value.requestInfo)) {
      const { SEND_SERVICE_TYPE } = value;
      if (!SEND_SERVICE_TYPE || SEND_SERVICE_TYPE === 'GENERAL') {
        return value;
      }
      if (SEND_SERVICE_TYPE === 'SPECIAL') {
        return value.payload;
      }
    }
    return value;
  }
}
