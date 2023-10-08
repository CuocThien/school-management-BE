import { Injectable } from '@nestjs/common';
import { isEmpty, map, compact, isEqual, sum, parseInt } from 'lodash';
import {
  ClassStudent,
  ClassSubject,
  Score,
  ScoreFinal,
  ScoreSemester,
} from 'libs/entities';
import { ClassSemester } from 'libs/entities/class-semester.entity';
import { response } from 'libs/utils';
import { In, getRepository } from 'typeorm';

@Injectable()
export class UpdateScoreService {
  public async updateScore(scoreId: number, body, reqUserId) {
    const { averageScore, classId, yearId, semesterId } = body;
    const [score, classSemester, classSemesters] = await Promise.all([
      getRepository(Score).findOne({
        id: scoreId,
        isDeleted: false,
      }),
      getRepository(ClassSemester).findOne({
        classId,
        semesterId,
        yearId,
        isDeleted: false,
      }),
      getRepository(ClassSemester).find({
        classId,
        yearId,
        isDeleted: false,
      }),
    ]);

    if (isEmpty(score)) return response(404, 'DATA_NOT_FOUND');
    await getRepository(Score).save({
      ...score,
      ...body,
      updatedAt: new Date(),
      updatedBy: reqUserId,
    });
    const [classSubjects, classStudent] = await Promise.all([
      getRepository(ClassSubject).find({
        classSemesterId: classSemester.id,
        isDeleted: false,
      }),
      getRepository(ClassStudent).findOne({
        studentId: score.studentId,
        classSemesterId: classSemester.id,
        isDeleted: false,
      }),
    ]);
    const classSubjectIds = map(classSubjects, 'id');
    const classSemesterIds = map(classSemesters, 'id');
    const [scores, classStudents] = await Promise.all([
      getRepository(Score).find({
        where: {
          studentId: score.studentId,
          classSubjectId: In(classSubjectIds),
          isDeleted: false,
        },
      }),
      getRepository(ClassStudent).find({
        where: {
          studentId: score.studentId,
          classSemesterId: In(classSemesterIds),
          isDeleted: false,
        },
      }),
    ]);
    const averageScoresStr = compact(map(scores, 'averageScore'));
    const averageScores = averageScoresStr.map((itm) => Number(itm));
    const classStudentIds = map(classStudents, 'id');
    if (!averageScore || !isEqual(averageScores.length, 13)) {
      await Promise.all([
        getRepository(ScoreFinal).update(
          {
            studentId: score.studentId,
            yearId,
            isDeleted: false,
          },
          {
            score: null,
            updatedAt: new Date(),
            updatedBy: reqUserId,
          },
        ),
        getRepository(ScoreSemester).update(
          {
            classStudentId: classStudent.id,
          },
          {
            averageScore: null,
            updatedAt: new Date(),
            updatedBy: reqUserId,
          },
        ),
      ]);
      return response(200, 'SUCCESSFULLY', Object.assign(score, body));
    }
    const newAverageScore = Number(sum(averageScores) / 13);
    await getRepository(ScoreSemester).update(
      {
        classStudentId: classStudent.id,
        isDeleted: false,
      },
      {
        averageScore: newAverageScore,
        updatedAt: new Date(),
        updatedBy: reqUserId,
      },
    );
    const scoreSemesters = await getRepository(ScoreSemester).find({
      where: {
        classStudentId: In(classStudentIds),
        isDeleted: false,
      },
    });
    const semesterAverageScoresStr = compact(
      map(scoreSemesters, 'averageScore'),
    );
    const semesterAverageScores = semesterAverageScoresStr.map((itm) =>
      Number(itm),
    );
    if (isEqual(semesterAverageScores.length, 2)) {
      const newAverageScore = Number(sum(semesterAverageScores) / 2);
      await getRepository(ScoreFinal).update(
        {
          studentId: score.studentId,
          yearId,
          isDeleted: false,
        },
        {
          score: newAverageScore,
          updatedAt: new Date(),
          updatedBy: reqUserId,
        },
      );
    }
    return response(200, 'SUCCESSFULLY', Object.assign(score, body));
  }
}
