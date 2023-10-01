import { Injectable } from '@nestjs/common';
import { Class } from 'libs/entities';
import { response } from 'libs/utils';
import { In, getRepository } from 'typeorm';
import { map, omitBy, isNil } from 'lodash';
import { ClassSubject } from 'libs/entities/class-subject.entity';

@Injectable()
export class GetClassesActiveByAccountTypeService {
  public async getClassesActiveByAccountType(query, accountType, accountId) {
    const { subjectId, semesterId, gradeId } = query;
    const conditions = {
      semesterId: semesterId && semesterId,
      subjectId: subjectId && subjectId,
      gradeId: gradeId && gradeId,
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
    const classIds = map(classSubjects, 'classId');
    const [result, total] = await getRepository(Class).findAndCount({
      where: {
        id: In(classIds),
        isDeleted: false,
      },
    });
    return response(200, 'SUCCESFFULL', { result, total });
  }
}
