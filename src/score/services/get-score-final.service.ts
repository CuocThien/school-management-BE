import { Injectable } from '@nestjs/common';
import { isEmpty, keyBy, map } from 'lodash';
import { ScoreFinal } from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';
import { Year } from 'libs/entities/year.entity';

@Injectable()
export class GetScoreFinalService {
  public async getScoreFinal(payload) {
    const { studentId } = payload;
    const scoreFinals = await getRepository(ScoreFinal).find({
      studentId,
      isDeleted: false,
    });
    if (isEmpty(scoreFinals)) {
      return response(200, 'SUCCESSFULLY', { result: [] });
    }
    const yearIds = map(scoreFinals, 'yearId');
    const years = await getRepository(Year).findByIds(yearIds);
    const objYear = keyBy(years, 'id');
    const result = scoreFinals.map((score) => {
      const year: Year = objYear[score.yearId] || {};
      return {
        ...score,
        year: year.name,
      };
    });
    return response(200, 'SUCCESSFULLY', { result });
  }
}
