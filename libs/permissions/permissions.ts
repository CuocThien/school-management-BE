import {
  ContactPermission,
  AssignmentPermission,
  TContactPermission,
  TAssignmentPermission,
  ModuleContactPermission,
  ModuleAssignmentPermission,
} from './module-permissions';

export const DEFAULT_VALUE_PERMISSION = {
  ...AssignmentPermission,
  ...ContactPermission,
};

export const MODULE_PERMISSION_MAPPER = {
  ...ModuleContactPermission,
  ...ModuleAssignmentPermission,
};

export type TPermission = TContactPermission & TAssignmentPermission;
