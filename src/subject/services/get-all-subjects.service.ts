import { Injectable } from '@nestjs/common';
import { Subject } from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';

@Injectable()
export class GetAllSubjectsService {
  public async getAllSubjects() {
    const [result, total] = await getRepository(Subject).findAndCount({
      isDeleted: false,
    });
    return response(200, 'SUCCESSFULLY', { result, total });
  }
}
