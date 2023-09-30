import { Injectable } from '@nestjs/common';
import { Class } from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';
import { omitBy, isNil } from 'lodash';

@Injectable()
export class GetClassesService {
  public async getClasses(query) {
    const { gradeId } = query;
    const conditions = omitBy({ gradeId, isDeleted: false }, isNil);
    const [result, total] = await getRepository(Class).findAndCount(conditions);
    return response(200, 'SUCCESFFULL', { result, total });
  }
}
