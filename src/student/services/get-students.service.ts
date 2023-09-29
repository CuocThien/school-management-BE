import { Injectable } from '@nestjs/common';
import { Account, Class, ClassStudent, Grade, Profile } from 'libs/entities';
import { getQueryPaging, response } from 'libs/utils';
import { In, getManager, getRepository } from 'typeorm';
import { keyBy, map, isEmpty, isNil } from 'lodash';

@Injectable()
export class GetStudentsService {
  private _getQueryStringByAdmin(data) {
    const { classId, gradeId, gender, queryString } = data;
    let where = 'a.isDeleted = :isDeleted AND a.accountType = :accountType';
    const params: any = { isDeleted: false, accountType: 'STUDENT' };
    if (!isNil(gender)) {
      where += ' AND p.gender = :gender';
      params['gender'] = gender;
    }
    if (!isEmpty(queryString)) {
      where += ' AND p.fullName LIKE :queryString';
      params['queryString'] = `%${queryString}%`;
    }
    if (!isNil(classId)) {
      where += ' AND cs.classId = :classId';
      params['classId'] = classId;
    }
    if (!isNil(gradeId)) {
      where += ' AND c.gradeId = :gradeId';
      params['gradeId'] = gradeId;
    }
    return { where, params };
  }

  private _getQueryStringByFormTeacher(data) {
    const { gender, queryString, teacherId } = data;
    let where =
      'a.isDeleted = :isDeleted AND a.accountType = :accountType AND c.teacherId = :teacherId';
    const params: any = {
      teacherId,
      isDeleted: false,
      accountType: 'STUDENT',
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
      return {
        id: raw['a_id'],
        email: raw['a_email'],
        status: raw['a_status'],
        roleId: raw['a_role_id'],
        account_type: raw['a_account_type'],
        fullName: raw['p_full_name'],
        birthday: raw['p_birthday'],
        phone: raw['p_phone'],
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
    const { where, params } = this._getQueryStringByAdmin(query);
    const [skip, take] = getQueryPaging(query);
    const studentManager = await getManager()
      .createQueryBuilder(Account, 'a')
      .leftJoinAndSelect(Profile, 'p', 'a.id = p.accountId')
      .leftJoin(ClassStudent, 'cs', 'cs.studentId = a.id')
      .leftJoinAndSelect(Class, 'c', 'c.id = cs.classId')
      .leftJoinAndSelect(Grade, 'g', 'g.id = c.gradeId')
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

  public async getStudentsByFormTeacher(query, accountId) {
    const { where, params } = this._getQueryStringByFormTeacher({
      ...query,
      teacherId: accountId,
    });
    const [skip, take] = getQueryPaging(query);
    const studentManager = await getManager()
      .createQueryBuilder(Account, 'a')
      .leftJoinAndSelect(Profile, 'p', 'a.id = p.accountId')
      .leftJoin(ClassStudent, 'cs', 'cs.studentId = a.id')
      .leftJoinAndSelect(Class, 'c', 'c.id = cs.classId')
      .leftJoinAndSelect(Grade, 'g', 'g.id = c.gradeId')
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
