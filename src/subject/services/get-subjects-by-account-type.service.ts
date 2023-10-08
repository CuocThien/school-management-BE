import { Injectable } from '@nestjs/common';
import { ClassSubject } from 'libs/entities/class-subject.entity';
import { In, getRepository } from 'typeorm';
import { map, omitBy, isNil } from 'lodash';
import { Class, Subject } from 'libs/entities';
import { response } from 'libs/utils';
import { GetSubjectsQueryDTO } from 'types';
import { ClassSemester } from 'libs/entities/class-semester.entity';

@Injectable()
export class GetSubjectsByAccountTypeService {
  public async getSubjectsByAccountType(
    query: GetSubjectsQueryDTO,
    accountType,
    accountId,
  ) {
    const { yearId, semesterId, gradeId } = query;
    const classes = await getRepository(Class).find({
      isDeleted: false,
      gradeId,
    });
    const classIds: number[] = map(classes, 'id');
    const classSemesters = await getRepository(ClassSemester).find({
      isDeleted: false,
      yearId,
      semesterId,
      classId: In(classIds),
    });
    const classSemesterIds = map(classSemesters, 'id');
    const conditions = {
      classSemesterId: In(classSemesterIds),
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
