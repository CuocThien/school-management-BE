import { Injectable } from '@nestjs/common';
import { Semester } from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';

@Injectable()
export class GetSemestersService {
  public async getSemesters() {
    const [result, total] = await getRepository(Semester).findAndCount({
      isDeleted: false,
    });
    return response(200, 'SUCCESSFULLY', { result, total });
  }
}
