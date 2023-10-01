import { Injectable } from '@nestjs/common';
import { Grade } from 'libs/entities';
import { response } from 'libs/utils';
import { In, getRepository } from 'typeorm';
import { map, omitBy, isNil } from 'lodash';
import { ClassSubject } from 'libs/entities/class-subject.entity';

@Injectable()
export class GetGradesActiveByAccountTypeService {
  public async getGradesActiveByAccountType(query, accountType, accountId) {
    const { semesterId } = query;
    const conditions = {
      semesterId: semesterId && semesterId,
      isDeleted: false,
    };
    if (['TEACHER', 'FORM_TEACHER'].includes(accountType)) {
      Object.assign(conditions, {
        teacherId: accountId,
      });
    }
    const classSubjects = await getRepository(ClassSubject).find(
      omitBy(conditions, isNil),
    );
    const gradeIds = map(classSubjects, 'gradeId');
    const [result, total] = await getRepository(Grade).findAndCount({
      where: {
        id: In(gradeIds),
        isDeleted: false,
      },
    });
    return response(200, 'SUCCESFFULL', { result, total });
  }
}
