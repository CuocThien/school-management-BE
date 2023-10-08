import { Injectable } from '@nestjs/common';
import { isEmpty, omitBy, isNil, size } from 'lodash';
import { ClassSubject, Profile, Score } from 'libs/entities';
import { getQueryPaging, response } from 'libs/utils';
import { getManager, getRepository } from 'typeorm';
import { ClassSemester } from 'libs/entities/class-semester.entity';

@Injectable()
export class GetScoresByClassAndSubjectService {
  private _parseScore(raws) {
    const result = raws.map((raw) => {
      const studentId = raw['s_student_id'];
      const score = {
        miniTest1Score: raw['s_mini_test_1_score'],
        miniTest2Score: raw['s_mini_test_2_score'],
        miniTest3Score: raw['s_mini_test_3_score'],
        midtermTestScore: raw['s_midterm_test_score'],
        endtermTestScore: raw['s_endterm_test_score'],
      };
      const isEnableCalAvgScore = size(Object.keys(omitBy(score, isNil))) === 5;
      return {
        id: raw['s_id'],
        isDeleted: raw['s_is_deleted'],
        studentId,
        classSubjectId: raw['s_class_subject_id'],
        createdAt: raw['s_created_at'],
        updatedAt: raw['s_updated_at'],
        deletedAt: raw['s_deleted_at'],
        createdBy: raw['s_created_by'],
        updatedBy: raw['s_updated_by'],
        deletedBy: raw['s_deleted_by'],
        review: raw['s_review'],
        fullName: raw['p_full_name'],
        averageScore: raw['s_average_score'],
        isEnableCalAvgScore,
        ...score,
      };
    });
    return result;
  }

  public async getScoresByClassAndSubject(payload) {
    const { classId, subjectId, semesterId, yearId } = payload;
    const classSemester = await getRepository(ClassSemester).findOne({
      isDeleted: false,
      classId,
      yearId,
      semesterId,
    });
    if (isEmpty(classSemester)) {
      return response(200, 'SUCCESSFULLY', { result: [], total: 0 });
    }
    const classSubject = await getRepository(ClassSubject).findOne({
      classSemesterId: classSemester.id,
      subjectId,
      isDeleted: false,
    });
    if (isEmpty(classSubject)) {
      return response(200, 'SUCCESSFULLY', { result: [], total: 0 });
    }
    const [skip, take] = getQueryPaging(payload);
    const scoreManager = await getManager()
      .createQueryBuilder(Score, 's')
      .leftJoinAndSelect(Profile, 'p', 's.studentId = p.accountId')
      .where({
        classSubjectId: classSubject.id,
        isDeleted: false,
      })
      .skip(skip)
      .take(take)
      .orderBy('p.fullName', 'DESC');
    const [scoresRaw, total] = await Promise.all([
      scoreManager.getRawMany(),
      scoreManager.getCount(),
    ]);
    const result = this._parseScore(scoresRaw);
    return response(200, 'SUCCESSFULLY', { result, total });
  }
}
