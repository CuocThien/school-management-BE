import { Injectable } from '@nestjs/common';
import { Score } from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';

@Injectable()
export class CreateScoreService {
  public async createScore(body, accountId) {
    const score = await getRepository(Score).save({
      ...body,
      createdAt: new Date(),
      createdBy: accountId,
    });
    return response(200, 'SUCCESSFULLY', score);
  }
}
