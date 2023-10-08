import { Injectable } from '@nestjs/common';
import { Class } from 'libs/entities';
import { response } from 'libs/utils';
import { In, getRepository } from 'typeorm';
import { map, omitBy, isNil } from 'lodash';
import { ClassSubject } from 'libs/entities/class-subject.entity';
import { GetClassesByTypeQueryDTO } from 'types';
import { ClassSemester } from 'libs/entities/class-semester.entity';

@Injectable()
export class GetClassesActiveByAccountTypeService {
  public async getClassesActiveByAccountType(
    query: GetClassesByTypeQueryDTO,
    accountType,
    accountId,
  ) {
    const { subjectId, semesterId, gradeId, yearId } = query;
    const classSemesters = await getRepository(ClassSemester).find({
      yearId,
      semesterId,
      isDeleted: false,
    });
    const classSemesterIds = map(classSemesters, 'id');
    const conditions = {
      subjectId: subjectId,
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
    const validClassSemesterIds = map(classSubjects, 'classSemesterId');
    const classIds = [];
    classSemesters.forEach((classS) => {
      const { id, classId } = classS;
      if (validClassSemesterIds.includes(id)) {
        classIds.push(classId);
      }
    });
    const [result, total] = await getRepository(Class).findAndCount({
      where: {
        id: In(classIds),
        gradeId,
        isDeleted: false,
      },
    });
    return response(200, 'SUCCESFFULL', { result, total });
  }
}
