import { Injectable } from '@nestjs/common';
import { Class } from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';

@Injectable()
export class GetClassesService {
  public async getClasses(query) {
    const { gradeId } = query;
    const [result, total] = await getRepository(Class).findAndCount({
      gradeId,
      isDeleted: false,
    });
    return response(200, 'SUCCESFFULL', { result, total });
  }
}
