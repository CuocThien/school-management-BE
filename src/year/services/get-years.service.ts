import { Injectable } from '@nestjs/common';
import { Year } from 'libs/entities/year.entity';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';

@Injectable()
export class GetYearsService {
  public async getYears() {
    const [result, total] = await getRepository(Year).findAndCount({
      isDeleted: false,
    });
    return response(200, 'SUCCESSFULLY', { result, total });
  }
}
