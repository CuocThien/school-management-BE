import {
  EContactPermission,
  EAssignmentPermission,
} from './module-permissions';

export const EPermission = {
  ...EAssignmentPermission,
  ...EContactPermission,
} as const;

export type EPermission = EContactPermission | EAssignmentPermission;
