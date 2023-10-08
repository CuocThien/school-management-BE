import { Injectable } from '@nestjs/common';
import { isEmpty, keyBy, map } from 'lodash';
import {
  ClassStudent,
  ClassSubject,
  Score,
  ScoreSemester,
  Subject,
} from 'libs/entities';
import { response } from 'libs/utils';
import { In, getRepository } from 'typeorm';
import { ClassSemester } from 'libs/entities/class-semester.entity';

@Injectable()
export class GetStudyProcessService {
  public async getStudyProcess(payload) {
    const { yearId, semesterId, studentId } = payload;
    const classStudents = await getRepository(ClassStudent).find({
      studentId,
      isDeleted: false,
    });
    const classSemesterIds: number[] = map(classStudents, 'classSemesterId');
    const classSemester = await getRepository(ClassSemester).findOne({
      id: In(classSemesterIds),
      yearId,
      semesterId,
      isDeleted: false,
    });
    if (isEmpty(classSemester)) {
      return response(200, 'SUCCESSFULLY', {
        studyProcess: [],
        scoreSemester: undefined,
      });
    }
    const [classSubjects, classStudent] = await Promise.all([
      getRepository(ClassSubject).find({
        classSemesterId: classSemester.id,
        isDeleted: false,
      }),
      getRepository(ClassStudent).findOne({
        classSemesterId: classSemester.id,
        studentId,
        isDeleted: false,
      }),
    ]);
    if (isEmpty(classSubjects)) {
      return response(200, 'SUCCESSFULLY', {
        studyProcess: [],
        scoreSemester: undefined,
      });
    }
    const subjectIds = map(classSubjects, 'subjectId');
    const classSubjectIds: number[] = map(classSubjects, 'id');
    const [subjects, scores, scoreSemester] = await Promise.all([
      getRepository(Subject).findByIds(subjectIds),
      getRepository(Score).find({
        studentId,
        classSubjectId: In(classSubjectIds),
        isDeleted: false,
      }),
      getRepository(ScoreSemester).findOne({
        classStudentId: classStudent.id,
        isDeleted: false,
      }),
    ]);
    const objSubject = keyBy(subjects, 'id');
    const objScore = keyBy(scores, 'classSubjectId');
    const result = classSubjects.map((classSu) => {
      const { subjectId, id } = classSu;
      const subject = objSubject[subjectId] || {};
      const score: Score = objScore[id] || {};
      const { name } = subject;
      const {
        miniTest1Score,
        miniTest2Score,
        miniTest3Score,
        midtermTestScore,
        endtermTestScore,
        averageScore,
        review,
      } = score;
      return {
        subjectId,
        subjectName: name,
        miniTest1Score,
        miniTest2Score,
        miniTest3Score,
        midtermTestScore,
        endtermTestScore,
        averageScore,
        review,
      };
    });
    return response(200, 'SUCCESSFULLY', {
      studyProcess: result,
      scoreSemester: scoreSemester.averageScore,
    });
  }
}
