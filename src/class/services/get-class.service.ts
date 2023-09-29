import { Injectable } from '@nestjs/common';
import { Class } from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';

@Injectable()
export class GetClassesService {
  public async getClasses() {
    const [result, total] = await getRepository(Class).findAndCount();
    return response(200, 'SUCCESFFULL', { result, total });
  }
}
