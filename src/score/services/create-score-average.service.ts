import { Injectable } from '@nestjs/common';
import {
  Account,
  Class,
  ClassSubject,
  Score,
  ScoreAverage,
} from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';
import { isEmpty } from 'lodash';

@Injectable()
export class CreateScoreAverageService {
  public async createScoreAverage(payload, accountId) {
    const { studentId, classSubjectId, score } = payload;
    const [student, classSubject] = await Promise.all([
      getRepository(Account).findOne({
        id: studentId,
        isDeleted: false,
      }),
      getRepository(ClassSubject).findOne({
        id: classSubjectId,
        isDeleted: false,
      }),
    ]);
    if (isEmpty(student) || isEmpty(classSubject))
      return response(404, 'DATA_NOT_FOUND');
    const scoreAverage = await getRepository(ScoreAverage).save({
      studentId,
      classSubjectId,
      score,
      createdAt: new Date(),
      createdBy: accountId,
    });
    return response(200, 'SUCCESSFULLY', scoreAverage);
  }
}
