export enum EModuleAccess {
  CONTACT = 'CONTACT',
  ASSIGNMENT = 'ASSIGNMENT',
}

export type TModuleAccess = {
  [key in EModuleAccess]: string;
};

export const DEFAULT_VALUE_MODULE: TModuleAccess = {
  CONTACT: 'none',
  ASSIGNMENT: 'none',
};
