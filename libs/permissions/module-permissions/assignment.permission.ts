import { EModuleAccess } from '../module-access';

export enum EAssignmentPermission {
  ASSIGNMENT_CREATE = 'ASSIGNMENT_CREATE',
  ASSIGNMENT_DELETE = 'ASSIGNMENT_DELETE',
  ASSIGNMENT_UPDATE = 'ASSIGNMENT_UPDATE',
  ASSIGNMENT_VIEW = 'ASSIGNMENT_VIEW',
}

export type TAssignmentPermission = {
  [key in EAssignmentPermission]: boolean;
};

export const AssignmentPermission: TAssignmentPermission = {
  ASSIGNMENT_CREATE: false,
  ASSIGNMENT_DELETE: false,
  ASSIGNMENT_UPDATE: false,
  ASSIGNMENT_VIEW: false,
};

export type TModuleAssignmentPermission = {
  [key in EAssignmentPermission]: string;
};

export const ModuleAssignmentPermission: TModuleAssignmentPermission = {
  ASSIGNMENT_CREATE: EModuleAccess.ASSIGNMENT,
  ASSIGNMENT_DELETE: EModuleAccess.ASSIGNMENT,
  ASSIGNMENT_UPDATE: EModuleAccess.ASSIGNMENT,
  ASSIGNMENT_VIEW: EModuleAccess.ASSIGNMENT,
};
