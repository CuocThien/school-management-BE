import { Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { Score } from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';

@Injectable()
export class UpdateScoreService {
  public async updateScore(scoreId: number, body, requestId) {
    const score = await getRepository(Score).findOne({
      id: scoreId,
      isDeleted: false,
    });

    if (isEmpty(score)) return response(404, 'DATA_NOT_FOUND');
    await getRepository(Score).save({
      ...score,
      ...body,
      updatedAt: new Date(),
      updatedBy: requestId,
    });

    return response(200, 'SUCCESSFULLY', Object.assign(score, body));
  }
}
