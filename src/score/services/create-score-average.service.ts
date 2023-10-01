import { Injectable } from '@nestjs/common';
import { Account, ClassSubject, ScoreAverage } from 'libs/entities';
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
    const existedScoreAvg = await getRepository(ScoreAverage).findOne({
      studentId,
      classSubjectId,
      isDeleted: false,
    });
    const body = {};
    if (isEmpty(existedScoreAvg)) {
      Object.assign(body, {
        createdAt: new Date(),
        createdBy: accountId,
      });
    } else {
      Object.assign(body, existedScoreAvg, {
        updatedAt: new Date(),
        updatedBy: accountId,
      });
    }
    const scoreAverage = await getRepository(ScoreAverage).save({
      ...body,
      studentId,
      classSubjectId,
      score,
    });
    return response(200, 'SUCCESSFULLY', scoreAverage);
  }
}
