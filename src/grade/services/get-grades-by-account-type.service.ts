import { Injectable } from '@nestjs/common';
import { Class, Grade } from 'libs/entities';
import { response } from 'libs/utils';
import { In, getRepository } from 'typeorm';
import { isEmpty, map, omitBy, isNil } from 'lodash';
import { ClassSubject } from 'libs/entities/class-subject.entity';
import { GetGradesByTypeQueryDTO } from 'types';
import { ClassSemester } from 'libs/entities/class-semester.entity';

@Injectable()
export class GetGradesActiveByAccountTypeService {
  public async getGradesActiveByAccountType(
    query: GetGradesByTypeQueryDTO,
    accountType,
    accountId,
  ) {
    const { semesterId, yearId } = query;
    const classSemesters = await getRepository(ClassSemester).find({
      isDeleted: false,
      semesterId,
      yearId,
    });
    if (isEmpty(classSemesters)) {
      return response(200, 'SUCCESFFULL', { result: [], total: 0 });
    }
    const classIds = map(classSemesters, 'classId');
    const conditions = {
      id: In(classIds),
      isDeleted: false,
    };
    if (['TEACHER', 'FORM_TEACHER'].includes(accountType)) {
      const classSemesterIds: number[] = map(classSemesters, 'id');
      const activeClassSubjects = await getRepository(ClassSubject).find({
        isDeleted: false,
        teacherId: accountId,
        classSemesterId: In(classSemesterIds),
      });
      const activeClassSemesterIds = map(
        activeClassSubjects,
        'classSemesterId',
      );
      const validClassIds = [];
      classSemesters.forEach((classS) => {
        const { classId, id } = classS;
        if (activeClassSemesterIds.includes(id)) {
          validClassIds.push(classId);
        }
      });
      Object.assign(conditions, {
        id: In(validClassIds),
      });
    }
    const classes = await getRepository(Class).find(omitBy(conditions, isNil));
    const gradeIds = map(classes, 'gradeId');
    const [result, total] = await getRepository(Grade).findAndCount({
      where: {
        id: In(gradeIds),
        isDeleted: false,
      },
    });
    return response(200, 'SUCCESFFULL', { result, total });
  }
}
