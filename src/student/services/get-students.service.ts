import { Injectable } from '@nestjs/common';
import { Account, ClassStudent, Profile } from 'libs/entities';
import { getQueryPaging, response } from 'libs/utils';
import { In, getManager, getRepository } from 'typeorm';
import { keyBy, map, isEmpty, isNil } from 'lodash';
import { GetStudentsQueryDTO } from 'types';
import { ClassSemester } from 'libs/entities/class-semester.entity';

@Injectable()
export class GetStudentsService {
  private _getQueryString(data) {
    const { gender, queryString, studentIds } = data;
    let where =
      'a.isDeleted = :isDeleted AND a.accountType = :accountType AND a.id IN(:studentIds) ';
    const params: any = {
      isDeleted: false,
      accountType: 'STUDENT',
      studentIds,
    };
    if (!isNil(gender)) {
      where += ' AND p.gender = :gender';
      params['gender'] = gender;
    }
    if (!isEmpty(queryString)) {
      where += ' AND p.fullName LIKE :queryString';
      params['queryString'] = `%${queryString}%`;
    }
    return { where, params };
  }

  private _parseDataRaw(raws, teachers) {
    const result = raws.map((raw) => {
      const teacherId = raw['c_teacher_id'];
      const teacher = teachers[teacherId] || {};
      const gender = raw['p_gender'] ? 'Nam' : 'Nữ';
      return {
        id: raw['a_id'],
        email: raw['a_email'],
        status: raw['a_status'],
        roleId: raw['a_role_id'],
        account_type: raw['a_account_type'],
        fullName: raw['p_full_name'],
        birthday: raw['p_birthday'],
        phone: raw['p_phone'],
        gender,
        parentId: raw['p_parent_id'],
        avatar: raw['p_avatar'],
        classId: raw['c_id'],
        className: raw['c_name'],
        teacherId: raw['c_teacher_id'],
        teacherName: teacher.fullName || '',
        gradeId: raw['g_name_id'],
        gradeName: raw['g_name'],
      };
    });
    return result;
  }

  public async getStudentsByAdmin(query) {
    const { classId, yearId, semesterId } = query;
    const classSemester = await getRepository(ClassSemester).findOne({
      semesterId,
      yearId,
      classId,
      isDeleted: false,
    });
    if (isEmpty(classSemester)) {
      return response(200, 'SUCCESSFULLY', { result: [], total: 0 });
    }
    const classStudents = await getRepository(ClassStudent).find({
      isActive: true,
      isDeleted: false,
      classSemesterId: classSemester.id,
    });
    const studentIds = map(classStudents, 'studentId');
    const { where, params } = this._getQueryString({ ...query, studentIds });
    const [skip, take] = getQueryPaging(query);
    const studentManager = await getManager()
      .createQueryBuilder(Account, 'a')
      .leftJoinAndSelect(Profile, 'p', 'a.id = p.accountId')
      .where(where, params)
      .skip(skip)
      .take(take)
      .orderBy('p.fullName', 'DESC');
    const [studentsRaw, total] = await Promise.all([
      studentManager.getRawMany(),
      studentManager.getCount(),
    ]);
    const teacherIds = map(studentsRaw, 'c_teacher_id');
    const teachers = await getRepository(Profile).find({
      where: { accountId: In(teacherIds) },
    });
    const objTeacher = keyBy(teachers, 'accountId');
    const result = this._parseDataRaw(studentsRaw, objTeacher);
    return response(200, 'SUCCESSFULLY', { result, total });
  }

  public async getStudentsByFormTeacher(query: GetStudentsQueryDTO, accountId) {
    const { yearId, semesterId } = query;
    const classSemester = await getRepository(ClassSemester).findOne({
      semesterId,
      yearId,
      teacherId: accountId,
      isDeleted: false,
    });
    if (isEmpty(classSemester)) {
      return response(200, 'SUCCESSFULLY', { result: [], total: 0 });
    }
    const classStudents = await getRepository(ClassStudent).find({
      isActive: true,
      isDeleted: false,
      classSemesterId: classSemester.id,
    });
    const studentIds = map(classStudents, 'studentId');
    const { where, params } = this._getQueryString({
      ...query,
      studentIds,
    });
    const [skip, take] = getQueryPaging(query);
    const studentManager = await getManager()
      .createQueryBuilder(Account, 'a')
      .leftJoinAndSelect(Profile, 'p', 'a.id = p.accountId')
      .where(where, params)
      .skip(skip)
      .take(take)
      .orderBy('p.fullName', 'DESC');
    const [studentsRaw, total] = await Promise.all([
      studentManager.getRawMany(),
      studentManager.getCount(),
    ]);
    const teacherIds = map(studentsRaw, 'c_teacher_id');
    const teachers = await getRepository(Profile).find({
      where: { accountId: In(teacherIds) },
    });
    const objTeacher = keyBy(teachers, 'accountId');
    const result = this._parseDataRaw(studentsRaw, objTeacher);
    return response(200, 'SUCCESSFULLY', { result, total });
  }
}
