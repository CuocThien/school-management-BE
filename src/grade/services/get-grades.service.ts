import { Injectable } from '@nestjs/common';
import { Grade } from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';

@Injectable()
export class GetGradesService {
  public async getGrades() {
    const [result, total] = await getRepository(Grade).findAndCount();
    return response(200, 'SUCCESSFULLY', { result, total });
  }
}
