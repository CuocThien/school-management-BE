import { Injectable } from '@nestjs/common';
import { ClassSubject } from 'libs/entities/class-subject.entity';
import { In, getRepository } from 'typeorm';
import { map, omitBy, isNil } from 'lodash';
import { Subject } from 'libs/entities';
import { response } from 'libs/utils';

@Injectable()
export class GetSubjectsByAccountTypeService {
  public async getSubjectsByAccountType(query, accountType, accountId) {
    const { classId, semesterId, gradeId } = query;
    const conditions = {
      isDeleted: false,
      classId: classId && classId,
      gradeId: gradeId && gradeId,
      semesterId: semesterId && semesterId,
    };
    if (['TEACHER', 'FORM_TEACHER'].includes(accountType)) {
      Object.assign(conditions, {
        teacherId: accountId,
      });
    }
    const classSubjects = await getRepository(ClassSubject).find(
      omitBy(conditions, isNil),
    );
    const subjectIds = map(classSubjects, 'subjectId');
    const [result, total] = await getRepository(Subject).findAndCount({
      where: {
        id: In(subjectIds),
        isDeleted: false,
      },
    });
    return response(200, 'SUCCESSSFULLY', { result, total });
  }
}
