import { Injectable } from '@nestjs/common';
import { Account, Class, ClassStudent, Profile } from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';
import { isEmpty } from 'lodash';

@Injectable()
export class GetStudentService {
  public async getStudent(accountId: number) {
    const [account, profile, classStudent] = await Promise.all([
      getRepository(Account).findOne({
        id: accountId,
        isDeleted: false,
      }),
      getRepository(Profile).findOne({
        accountId,
        isDeleted: false,
      }),
      getRepository(ClassStudent).findOne({
        studentId: accountId,
        isDeleted: false,
      }),
    ]);
    if (isEmpty(account) || isEmpty(profile)) {
      return response(404, 'ACCOUNT_NOT_FOUND');
    }
    const validClassInfo = {};
    if (!isEmpty(classStudent)) {
      const { classId } = classStudent;
      const classInfo = await getRepository(Class).findOne({
        id: classId,
        isDeleted: false,
      });
      Object.assign(validClassInfo, {
        classId: classInfo?.id || null,
        className: classInfo?.name || '',
        position: classStudent.isClassMonitor ? 'Lớp trưởng' : 'Học sinh',
      });
    }
    const { parentId } = profile;
    const result = {
      studentInfo: {
        ...profile,
        ...account,
        ...validClassInfo,
        gender: profile.gender ? 'Nam' : 'Nữ',
      },
      parentInfo: {},
    };
    if (!isEmpty(parentId)) {
      const [parentAccount = {}, parentProfile = {}] = await Promise.all([
        getRepository(Account).findOne({
          id: parentId,
          isDeleted: false,
        }),
        getRepository(Profile).findOne({
          accountId: parentId,
          isDeleted: false,
        }),
      ]);
      Object.assign(result.parentInfo, {
        ...parentProfile,
        ...parentAccount,
      });
    }
    return response(200, 'SUCCESSFULLY', result);
  }
}
